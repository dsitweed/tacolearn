import { Injectable } from '@nestjs/common';
import { PrismaService } from 'core/prisma/prisma.service';
import { Exam, User } from 'generated/prisma/client';
import { ExamWhereInput } from 'generated/prisma/internal/prismaNamespaceBrowser';

import { SubmitExamDto } from './dto/submit-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublishedExams(jlptLevel?: string): Promise<Exam[]> {
    const where = jlptLevel
      ? { isPublished: true, jlptLevel: jlptLevel as any }
      : { isPublished: true };

    const exams = await this.prisma.exam.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        questions: {
          select: { id: true },
        },
      },
    });

    return exams.map((exam) => ({
      ...exam,
      totalQuestions: (exam as any).questions?.length || 0,
    }));
  }

  async findExamById(id: string): Promise<Exam | null> {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { orderInExam: 'asc' },
          select: {
            id: true,
            jlptLevel: true,
            section: true,
            skill: true,
            questionType: true,
            difficulty: true,
            content: true,
            imageUrl: true,
            choices: true,
            correctAnswerCode: true,
            explanation: true,
            tags: true,
            attemptCount: true,
            correctCount: true,
            orderInExam: true,
          },
        },
      },
    });
    return exam;
  }

  async submitExam(examId: string, submitExamDto: SubmitExamDto, user: User) {
    // Get exam with questions and correct answers
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          select: {
            id: true,
            correctAnswerCode: true,
          },
        },
      },
    });

    if (!exam) {
      throw Error('Exam not found');
    }

    // Calculate score
    let correctCount = 0;
    const results = submitExamDto.answers.map((answer) => {
      const question = exam.questions.find((q) => q.id === answer.questionId);
      const isCorrect = question?.correctAnswerCode === answer.selectedAnswer;

      if (isCorrect) {
        correctCount++;
      }

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question?.correctAnswerCode,
        isCorrect,
      };
    });

    const score =
      exam.questions.length > 0
        ? Math.round((correctCount / exam.questions.length) * 100)
        : 0;

    // Create practice session record
    const practiceSession = await this.prisma.practiceSession.create({
      data: {
        studentId: user.id, // Use user.id as fallback
        examId: examId,
        sessionType: 'MOCK_TEST',
        totalTimeSeconds: submitExamDto.timeSpent,
        totalQuestions: exam.questions.length,
        correctAnswers: correctCount,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    // Create question attempts
    if (user.id) {
      const attemptsData = results.map((result) => ({
        studentId: user.id,
        questionId: result.questionId,
        studentAnswerCode: result.selectedAnswer,
        isCorrect: result.isCorrect,
        sessionId: practiceSession.id,
        timeSpentSeconds: Math.floor(
          submitExamDto.timeSpent / exam.questions.length,
        ), // average time per question
      }));

      await this.prisma.questionAttempt.createMany({
        data: attemptsData,
      });
    }

    return {
      sessionId: practiceSession.id,
      score,
      correctCount,
      totalQuestions: exam.questions.length,
      timeSpent: submitExamDto.timeSpent,
      results,
    };
  }
}
