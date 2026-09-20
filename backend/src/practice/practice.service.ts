import { Injectable } from '@nestjs/common';
import { PrismaService } from 'core/prisma/prisma.service';
import { Question } from 'generated/prisma/client';

@Injectable()
export class PracticeService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(
    level: string,
    section: string,
    count: number,
  ): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: {
        jlptLevel: level as any,
        section: section as any,
      },
      take: count,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSession(data: {
    studentId: string;
    sessionType: string;
    jlptLevel?: string;
    skill?: string;
    examId?: string;
    totalQuestions: number;
    questionIds: string[];
  }) {
    const {
      studentId,
      sessionType,
      jlptLevel,
      skill,
      examId,
      totalQuestions,
      questionIds,
    } = data;

    const session = await this.prisma.practiceSession.create({
      data: {
        id: this.generateId(),
        studentId,
        sessionType: sessionType as any,
        examId: examId || null,
        jlptLevel: (jlptLevel as any) || null,
        skill: skill || null,
        totalQuestions,
        questionsCompleted: 0,
        correctAnswers: 0,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });

    if (questionIds.length > 0) {
      const attempts = questionIds.map((questionId) => ({
        id: this.generateId(),
        studentId,
        questionId,
        sessionId: session.id,
        studentAnswerCode: '',
        isCorrect: false,
        timeSpentSeconds: 0,
        attemptedAt: new Date(),
      }));
      await this.prisma.questionAttempt.createMany({ data: attempts });
    }

    return session;
  }

  async findSession(id: string) {
    const session = await this.prisma.practiceSession.findUnique({
      where: { id },
      include: {
        attempts: { include: { question: true } },
        exam: true,
      },
    });
    if (!session) {
      throw new Error('Practice session not found');
    }
    return session;
  }

  async submitAnswer(data: {
    sessionId: string;
    questionId: string;
    answerCode: string;
    timeSpentSeconds: number;
  }) {
    const { sessionId, questionId, answerCode, timeSpentSeconds } = data;

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      throw new Error('Question not found');
    }

    const isCorrect = answerCode === question.correctAnswerCode;

    const updated = await this.prisma.questionAttempt.updateMany({
      where: {
        sessionId,
        questionId,
        studentAnswerCode: '',
      },
      data: {
        studentAnswerCode: answerCode,
        isCorrect,
        timeSpentSeconds,
        attemptedAt: new Date(),
      },
    });

    if (updated.count === 0) {
      throw new Error('Attempt not found or already answered');
    }

    const session = await this.prisma.practiceSession.update({
      where: { id: sessionId },
      data: {
        questionsCompleted: { increment: 1 },
        correctAnswers: isCorrect ? { increment: 1 } : 0,
      },
    });

    return { isCorrect, question };
  }

  async completeSession(sessionId: string) {
    return this.prisma.practiceSession.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });
  }

  async getSessionResults(sessionId: string) {
    const session = await this.findSession(sessionId);
    const totalAttempts = session.attempts.length;
    const correctAttempts = session.attempts.filter((a) => a.isCorrect).length;
    const accuracy =
      totalAttempts > 0
        ? Math.round((correctAttempts / totalAttempts) * 100)
        : 0;

    return {
      session,
      totalQuestions: session.totalQuestions,
      questionsCompleted: session.questionsCompleted,
      correctAnswers: session.correctAnswers,
      accuracy,
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
