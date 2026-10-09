import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'core/prisma/prisma.service';
import type { Exam, Question, User } from 'generated/prisma/client';

import { ExamsService } from './exams.service';

type AttemptRow = {
  questionId: string;
  studentAnswerCode: string;
  isCorrect: boolean;
};

type SessionCreateArgs = {
  data: {
    studentId: string;
    examId: string;
    sessionType: string;
    status: string;
    totalQuestions: number;
    correctAnswers: number;
    questionsCompleted: number;
    totalTimeSeconds: number;
  };
};

type MockPrisma = {
  exam: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
  };
  studentProfile: { findUnique: jest.Mock };
  practiceSession: {
    create: jest.Mock<Promise<{ id: string }>, [SessionCreateArgs]>;
    findUnique: jest.Mock;
  };
  questionAttempt: {
    createMany: jest.Mock<Promise<{ count: number }>, [{ data: AttemptRow[] }]>;
  };
  question: { updateMany: jest.Mock };
  $transaction: jest.Mock;
};

const makeQuestion = (overrides: Partial<Question> = {}): Question => ({
  id: 'q1',
  jlptLevel: 'N3',
  section: 'VOCABULARY',
  skill: 'VOCABULARY_MEANING',
  questionType: 'MULTIPLE_CHOICE',
  difficulty: 'EASY',
  content: 'Question 1',
  imageUrl: null,
  choices: [
    { code: 'A', text: 'alpha' },
    { code: 'B', text: 'beta' },
  ],
  correctAnswerCode: 'A',
  explanation: 'A is correct',
  tags: ['core'],
  difficultyIndex: null,
  attemptCount: 0,
  correctCount: 0,
  source: 'MANUAL',
  sourceReference: null,
  examId: 'exam-1',
  orderInExam: 1,
  createdById: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const makeExam = (questions: Question[]): Exam & { questions: Question[] } => ({
  id: 'exam-1',
  title: 'JLPT N3 Mock',
  description: null,
  jlptLevel: 'N3',
  type: 'MOCK',
  year: null,
  month: null,
  durationMinutes: 60,
  totalQuestions: questions.length,
  isPublished: true,
  createdById: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  questions,
});

const studentUser = { id: 'user-1', role: 'STUDENT' } as User;

describe('ExamsService', () => {
  let service: ExamsService;
  let prisma: MockPrisma;

  beforeEach(async () => {
    prisma = {
      exam: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      studentProfile: { findUnique: jest.fn() },
      practiceSession: {
        create: jest
          .fn<Promise<{ id: string }>, [SessionCreateArgs]>()
          .mockResolvedValue({ id: 'session-1' }),
        findUnique: jest.fn(),
      },
      questionAttempt: {
        createMany: jest
          .fn<Promise<{ count: number }>, [{ data: AttemptRow[] }]>()
          .mockResolvedValue({ count: 0 }),
      },
      question: { updateMany: jest.fn().mockResolvedValue({ count: 0 }) },
      $transaction: jest.fn(),
    };
    prisma.$transaction.mockImplementation(
      async (callback: (tx: MockPrisma) => Promise<unknown>) =>
        callback(prisma),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ExamsService>(ExamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findExamById', () => {
    it('throws NotFoundException when the exam does not exist', async () => {
      prisma.exam.findUnique.mockResolvedValue(null);

      await expect(service.findExamById('missing')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException when the exam is not published', async () => {
      prisma.exam.findUnique.mockResolvedValue({
        ...makeExam([makeQuestion()]),
        isPublished: false,
      });

      await expect(service.findExamById('exam-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('omits the correct answer and explanation from the exam payload', async () => {
      prisma.exam.findUnique.mockResolvedValue(makeExam([makeQuestion()]));

      const result = await service.findExamById('exam-1');

      expect(result.totalQuestions).toBe(1);
      expect(result.questions).toHaveLength(1);
      expect(result.questions[0]).not.toHaveProperty('correctAnswerCode');
      expect(result.questions[0]).not.toHaveProperty('explanation');
      expect(result.questions[0].choices).toEqual([
        { code: 'A', text: 'alpha' },
        { code: 'B', text: 'beta' },
      ]);
    });
  });

  describe('submitExam', () => {
    it('throws ForbiddenException when the user has no student profile', async () => {
      prisma.exam.findUnique.mockResolvedValue(makeExam([makeQuestion()]));
      prisma.studentProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.submitExam(
          'exam-1',
          {
            answers: [{ questionId: 'q1', selectedAnswer: 'A' }],
            timeSpent: 60,
          },
          studentUser,
        ),
      ).rejects.toThrow(ForbiddenException);
      expect(prisma.practiceSession.create).not.toHaveBeenCalled();
    });

    it('persists the session for the student profile and scores answered questions', async () => {
      const questions = [
        makeQuestion({ id: 'q1', correctAnswerCode: 'A' }),
        makeQuestion({ id: 'q2', correctAnswerCode: 'B', orderInExam: 2 }),
        makeQuestion({ id: 'q3', correctAnswerCode: 'C', orderInExam: 3 }),
      ];
      prisma.exam.findUnique.mockResolvedValue(makeExam(questions));
      prisma.studentProfile.findUnique.mockResolvedValue({ id: 'student-1' });

      const result = await service.submitExam(
        'exam-1',
        {
          answers: [
            { questionId: 'q1', selectedAnswer: 'A' },
            { questionId: 'q2', selectedAnswer: 'A' },
          ],
          timeSpent: 90,
        },
        studentUser,
      );

      // q1 correct, q2 wrong, q3 unanswered -> 1/3
      expect(result.correctCount).toBe(1);
      expect(result.totalQuestions).toBe(3);
      expect(result.answeredCount).toBe(2);
      expect(result.score).toBeCloseTo(33.33, 2);
      expect(result.results[2].selectedAnswer).toBeNull();
      expect(result.results[2].isCorrect).toBe(false);

      expect(prisma.practiceSession.create).toHaveBeenCalledTimes(1);
      const sessionArgs = prisma.practiceSession.create.mock.calls[0][0];
      expect(sessionArgs.data).toMatchObject({
        studentId: 'student-1',
        examId: 'exam-1',
        sessionType: 'MOCK_TEST',
        status: 'COMPLETED',
        totalQuestions: 3,
        correctAnswers: 1,
        questionsCompleted: 2,
        totalTimeSeconds: 90,
      });

      const attemptData =
        prisma.questionAttempt.createMany.mock.calls[0][0].data;
      expect(attemptData).toHaveLength(3);
      expect(attemptData[2]).toMatchObject({
        questionId: 'q3',
        studentAnswerCode: '',
        isCorrect: false,
      });

      expect(prisma.question.updateMany).toHaveBeenCalledWith({
        where: { id: { in: ['q1', 'q2'] } },
        data: { attemptCount: { increment: 1 } },
      });
      expect(prisma.question.updateMany).toHaveBeenCalledWith({
        where: { id: { in: ['q1'] } },
        data: { correctCount: { increment: 1 } },
      });
    });
  });

  describe('findSessionResult', () => {
    it('throws NotFoundException when the session has no exam', async () => {
      prisma.practiceSession.findUnique.mockResolvedValue(null);

      await expect(
        service.findSessionResult('session-1', studentUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when another student owns the session', async () => {
      prisma.practiceSession.findUnique.mockResolvedValue({
        id: 'session-1',
        student: { id: 'student-2', userId: 'user-2' },
        exam: makeExam([makeQuestion()]),
        attempts: [],
      });

      await expect(
        service.findSessionResult('session-1', studentUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('rebuilds the result with per-section breakdown', async () => {
      prisma.practiceSession.findUnique.mockResolvedValue({
        id: 'session-1',
        student: { id: 'student-1', userId: 'user-1' },
        exam: makeExam([
          makeQuestion({ id: 'q1', section: 'VOCABULARY' }),
          makeQuestion({
            id: 'q2',
            section: 'GRAMMAR',
            correctAnswerCode: 'B',
          }),
        ]),
        attempts: [{ questionId: 'q1', studentAnswerCode: 'A' }],
        totalTimeSeconds: 120,
        startedAt: new Date(),
        completedAt: new Date(),
      });

      const result = await service.findSessionResult('session-1', studentUser);

      expect(result.correctCount).toBe(1);
      expect(result.answeredCount).toBe(1);
      expect(result.score).toBe(50);
      expect(result.sections).toEqual([
        { section: 'VOCABULARY', total: 1, correct: 1, accuracy: 100 },
        { section: 'GRAMMAR', total: 1, correct: 0, accuracy: 0 },
      ]);
    });
  });
});
