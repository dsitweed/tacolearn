import { faker } from '@faker-js/faker';
import {
  ConfidenceLevel,
  Exam,
  MistakeType,
  Prisma,
  PrismaClient,
  Question,
  SessionStatus,
  SessionType,
  StudentProfile,
} from 'generated/prisma/client';

import { ALL_SKILLS, JLPT_LEVELS, daysAgo } from './constants';

const SESSIONS_PER_STUDENT = { min: 2, max: 4 };
const QUESTIONS_PER_SESSION = { min: 5, max: 12 };

const CONFIDENCE_LEVELS: ConfidenceLevel[] = [
  ConfidenceLevel.VERY_LOW,
  ConfidenceLevel.LOW,
  ConfidenceLevel.MEDIUM,
  ConfidenceLevel.HIGH,
  ConfidenceLevel.VERY_HIGH,
];

const MISTAKE_TYPES: MistakeType[] = [
  MistakeType.CARELESS,
  MistakeType.MISUNDERSTANDING,
  MistakeType.SKILL_GAP,
  MistakeType.TIME_PRESSURE,
];

const SESSION_TYPES: SessionType[] = [
  SessionType.TARGETED,
  SessionType.MIXED,
  SessionType.WEAK_AREAS,
  SessionType.PREVIOUS_MISTAKES,
];

export async function seedPracticeSessions(
  prisma: PrismaClient,
  studentProfiles: StudentProfile[],
  questions: Question[],
  exams: Exam[],
): Promise<number> {
  console.log('🧩 Seeding practice sessions & attempts...');

  const existing = await prisma.practiceSession.count();
  if (existing > 0) {
    console.log(
      `⏭️  Practice sessions already seeded (${existing}), skipping.`,
    );
    return existing;
  }

  if (studentProfiles.length === 0 || questions.length === 0) {
    console.log('⚠️  No students or questions found, skipping sessions.');
    return 0;
  }

  let sessionCount = 0;

  for (const student of studentProfiles) {
    const sessions = faker.number.int(SESSIONS_PER_STUDENT);

    for (let s = 0; s < sessions; s++) {
      const isMockTest = Math.random() < 0.25 && exams.length > 0;
      const sessionType = isMockTest
        ? SessionType.MOCK_TEST
        : faker.helpers.arrayElement(SESSION_TYPES);
      const exam = isMockTest ? faker.helpers.arrayElement(exams) : null;
      const jlptLevel =
        exam?.jlptLevel ?? faker.helpers.arrayElement(JLPT_LEVELS);

      const pickedQuestions = faker.helpers.arrayElements(questions, {
        min: QUESTIONS_PER_SESSION.min,
        max: Math.min(QUESTIONS_PER_SESSION.max, questions.length),
      });

      const startedAt = daysAgo(faker.number.int({ min: 1, max: 60 }));
      let correctAnswers = 0;
      let totalTimeSeconds = 0;

      const attempts: Prisma.QuestionAttemptCreateManyInput[] =
        pickedQuestions.map((question) => {
          const isCorrect = Math.random() < 0.6;
          if (isCorrect) correctAnswers++;
          const timeSpentSeconds = faker.number.int({ min: 15, max: 120 });
          totalTimeSeconds += timeSpentSeconds;

          return {
            studentId: student.id,
            questionId: question.id,
            studentAnswerCode: faker.helpers.arrayElement(['A', 'B', 'C', 'D']),
            isCorrect,
            timeSpentSeconds,
            confidenceLevel: faker.helpers.arrayElement(CONFIDENCE_LEVELS),
            hintUsed: Math.random() < 0.2,
            markedForReview: Math.random() < 0.15,
            mistakeType: isCorrect
              ? null
              : faker.helpers.arrayElement(MISTAKE_TYPES),
            attemptedAt: startedAt,
          };
        });

      const completed = Math.random() < 0.85;

      const session = await prisma.practiceSession.create({
        data: {
          studentId: student.id,
          sessionType,
          examId: exam?.id ?? null,
          jlptLevel,
          skill: isMockTest ? null : faker.helpers.arrayElement(ALL_SKILLS),
          totalQuestions: pickedQuestions.length,
          questionsCompleted: pickedQuestions.length,
          correctAnswers,
          totalTimeSeconds,
          status: completed
            ? SessionStatus.COMPLETED
            : SessionStatus.IN_PROGRESS,
          startedAt,
          completedAt: completed
            ? new Date(startedAt.getTime() + totalTimeSeconds * 1000)
            : null,
        },
      });

      await prisma.questionAttempt.createMany({
        data: attempts.map((attempt) => ({
          ...attempt,
          sessionId: session.id,
        })),
      });

      sessionCount++;
    }
  }

  console.log(`✅ Practice sessions seeded: ${sessionCount}`);
  return sessionCount;
}
