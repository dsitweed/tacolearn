import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'core/prisma/prisma.service';
import { Question } from 'generated/prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findManyByLevelAndSection(
    jlptLevel: string,
    section: string,
    limit: number = 10,
  ): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        jlptLevel: jlptLevel as any,
        section: section as any,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        attempts: {
          take: 1,
          orderBy: { attemptedAt: 'desc' },
        },
      },
    });
    return questions;
  }

  async findManyByLevel(
    jlptLevel: string,
    limit: number = 10,
  ): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        jlptLevel: jlptLevel as any,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    return questions;
  }

  async findOne(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    return question;
  }

  async findRandomByLevelAndSection(
    jlptLevel: string,
    section: string,
    count: number,
  ): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        jlptLevel: jlptLevel as any,
        section: section as any,
      },
      take: count,
      orderBy: { createdAt: 'desc' },
    });
    return questions;
  }

  async getStats(jlptLevel?: string): Promise<{
    total: number;
    bySection: Record<string, number>;
  }> {
    const where = jlptLevel ? { jlptLevel: jlptLevel as any } : {};
    const total = await this.prisma.question.count({ where });
    const bySection = await this.prisma.question.groupBy({
      by: ['section'],
      where,
      _count: { id: true },
    });
    return {
      total,
      bySection: Object.fromEntries(
        bySection.map((s) => [s.section, s._count.id]),
      ),
    };
  }
}
