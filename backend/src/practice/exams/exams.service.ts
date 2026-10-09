import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'core/prisma/prisma.service';
import {
  Exam,
  JlptLevel,
  Prisma,
  Question,
  SessionStatus,
  SessionType,
  User,
  UserRole,
} from 'generated/prisma/client';

import { SubmitExamDto } from './dto/submit-exam.dto';

export type ExamChoice = { code: string; text: string };

// Question payload sent to the client while the exam is being taken.
// Deliberately omits correctAnswerCode/explanation so answers are not leaked.
export type ExamQuestionView = {
  id: string;
  jlptLevel: Question['jlptLevel'];
  section: Question['section'];
  skill: string;
  questionType: Question['questionType'];
  difficulty: Question['difficulty'];
  content: string;
  imageUrl: string | null;
  choices: ExamChoice[];
  tags: string[];
  orderInExam: number | null;
};

export type ExamResultItem = {
  questionId: string;
  orderInExam: number | null;
  section: Question['section'];
  skill: string;
  content: string;
  imageUrl: string | null;
  choices: ExamChoice[];
  selectedAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

export type ExamSectionBreakdown = {
  section: string;
  total: number;
  correct: number;
  accuracy: number;
};

const JLPT_LEVELS = Object.values(JlptLevel) as string[];

const QUESTION_ORDER: Prisma.QuestionOrderByWithRelationInput[] = [
  { orderInExam: 'asc' },
  { createdAt: 'asc' },
];

function parseChoices(value: Prisma.JsonValue): ExamChoice[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      return [];
    }

    const { code, text } = item as Record<string, unknown>;
    if (typeof code !== 'string') {
      return [];
    }

    return [
      {
        code,
        text: typeof text === 'string' ? text : '',
      },
    ];
  });
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublishedExams(jlptLevel?: string): Promise<Exam[]> {
    const where: Prisma.ExamWhereInput = { isPublished: true };

    if (jlptLevel && JLPT_LEVELS.includes(jlptLevel)) {
      where.jlptLevel = jlptLevel as JlptLevel;
    }

    const exams = await this.prisma.exam.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { questions: true } } },
    });

    return exams.map(({ _count, ...exam }) => ({
      ...exam,
      totalQuestions: _count.questions,
    }));
  }

  async findExamById(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: { questions: { orderBy: QUESTION_ORDER } },
    });

    if (!exam || !exam.isPublished) {
      throw new NotFoundException('Exam not found');
    }

    const { questions, ...examInfo } = exam;

    return {
      ...examInfo,
      totalQuestions: questions.length,
      questions: questions.map((question) => this.toQuestionView(question)),
    };
  }

  async submitExam(examId: string, submitExamDto: SubmitExamDto, user: User) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: { orderBy: QUESTION_ORDER } },
    });

    if (!exam || !exam.isPublished) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.questions.length === 0) {
      throw new BadRequestException('Exam has no questions');
    }

    const student = await this.prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!student) {
      throw new ForbiddenException('Only student accounts can submit an exam');
    }

    const selectedByQuestionId = new Map(
      submitExamDto.answers.map((answer) => [
        answer.questionId,
        answer.selectedAnswer,
      ]),
    );

    const results = exam.questions.map((question) =>
      this.buildResultItem(
        question,
        selectedByQuestionId.get(question.id) ?? null,
      ),
    );

    const totalQuestions = results.length;
    const correctCount = results.filter((result) => result.isCorrect).length;
    const answeredIds = results
      .filter((result) => result.selectedAnswer !== null)
      .map((result) => result.questionId);
    const correctIds = results
      .filter((result) => result.isCorrect)
      .map((result) => result.questionId);
    const score = round2((correctCount / totalQuestions) * 100);
    const timePerQuestion = Math.floor(
      submitExamDto.timeSpent / totalQuestions,
    );
    const completedAt = new Date();

    const session = await this.prisma.$transaction(async (tx) => {
      const created = await tx.practiceSession.create({
        data: {
          studentId: student.id,
          sessionType: SessionType.MOCK_TEST,
          examId: exam.id,
          jlptLevel: exam.jlptLevel,
          totalQuestions,
          questionsCompleted: answeredIds.length,
          correctAnswers: correctCount,
          totalTimeSeconds: submitExamDto.timeSpent,
          status: SessionStatus.COMPLETED,
          startedAt: new Date(
            completedAt.getTime() - submitExamDto.timeSpent * 1000,
          ),
          completedAt,
        },
      });

      await tx.questionAttempt.createMany({
        data: results.map((result) => ({
          studentId: student.id,
          questionId: result.questionId,
          sessionId: created.id,
          studentAnswerCode: result.selectedAnswer ?? '',
          isCorrect: result.isCorrect,
          timeSpentSeconds: timePerQuestion,
        })),
      });

      if (answeredIds.length > 0) {
        await tx.question.updateMany({
          where: { id: { in: answeredIds } },
          data: { attemptCount: { increment: 1 } },
        });
      }

      if (correctIds.length > 0) {
        await tx.question.updateMany({
          where: { id: { in: correctIds } },
          data: { correctCount: { increment: 1 } },
        });
      }

      await tx.exam.update({
        where: { id: exam.id },
        data: { totalQuestions },
      });

      return created;
    });

    return {
      sessionId: session.id,
      examId: exam.id,
      examTitle: exam.title,
      jlptLevel: exam.jlptLevel,
      score,
      correctCount,
      totalQuestions,
      answeredCount: answeredIds.length,
      timeSpent: submitExamDto.timeSpent,
      results,
    };
  }

  async findSessionResult(sessionId: string, user: User) {
    const session = await this.prisma.practiceSession.findUnique({
      where: { id: sessionId },
      include: {
        student: true,
        exam: { include: { questions: { orderBy: QUESTION_ORDER } } },
        attempts: true,
      },
    });

    if (!session || !session.exam) {
      throw new NotFoundException('Exam session not found');
    }

    if (user.role !== UserRole.ADMIN && session.student.userId !== user.id) {
      throw new ForbiddenException('You cannot view this exam session');
    }

    const answerByQuestionId = new Map(
      session.attempts.map((attempt) => [
        attempt.questionId,
        attempt.studentAnswerCode,
      ]),
    );

    const results = session.exam.questions.map((question) => {
      const storedAnswer = answerByQuestionId.get(question.id);

      return this.buildResultItem(question, storedAnswer ? storedAnswer : null);
    });

    const totalQuestions = results.length;
    const correctCount = results.filter((result) => result.isCorrect).length;
    const answeredCount = results.filter(
      (result) => result.selectedAnswer !== null,
    ).length;

    return {
      sessionId: session.id,
      examId: session.exam.id,
      examTitle: session.exam.title,
      jlptLevel: session.exam.jlptLevel,
      score:
        totalQuestions > 0 ? round2((correctCount / totalQuestions) * 100) : 0,
      correctCount,
      totalQuestions,
      answeredCount,
      timeSpent: session.totalTimeSeconds ?? 0,
      startedAt: session.startedAt,
      completedAt: session.completedAt,
      sections: this.buildSectionBreakdown(results),
      results,
    };
  }

  private toQuestionView(question: Question): ExamQuestionView {
    return {
      id: question.id,
      jlptLevel: question.jlptLevel,
      section: question.section,
      skill: question.skill,
      questionType: question.questionType,
      difficulty: question.difficulty,
      content: question.content,
      imageUrl: question.imageUrl,
      choices: parseChoices(question.choices),
      tags: question.tags,
      orderInExam: question.orderInExam,
    };
  }

  private buildResultItem(
    question: Question,
    selectedAnswer: string | null,
  ): ExamResultItem {
    return {
      questionId: question.id,
      orderInExam: question.orderInExam,
      section: question.section,
      skill: question.skill,
      content: question.content,
      imageUrl: question.imageUrl,
      choices: parseChoices(question.choices),
      selectedAnswer,
      correctAnswer: question.correctAnswerCode,
      explanation: question.explanation,
      isCorrect:
        selectedAnswer !== null &&
        selectedAnswer === question.correctAnswerCode,
    };
  }

  private buildSectionBreakdown(
    results: ExamResultItem[],
  ): ExamSectionBreakdown[] {
    const breakdown = new Map<string, ExamSectionBreakdown>();

    for (const result of results) {
      const entry = breakdown.get(result.section) ?? {
        section: result.section,
        total: 0,
        correct: 0,
        accuracy: 0,
      };

      entry.total += 1;
      if (result.isCorrect) {
        entry.correct += 1;
      }

      breakdown.set(result.section, entry);
    }

    return [...breakdown.values()].map((entry) => ({
      ...entry,
      accuracy:
        entry.total > 0 ? round2((entry.correct / entry.total) * 100) : 0,
    }));
  }
}
