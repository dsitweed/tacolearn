import { faker } from '@faker-js/faker';
import {
  Exam,
  ExamType,
  JlptLevel,
  PrismaClient,
  User,
} from 'generated/prisma/client';

type ExamSeed = {
  title: string;
  description: string;
  jlptLevel: JlptLevel;
  type: ExamType;
  year: number | null;
  month: number | null;
  durationMinutes: number;
  totalQuestions: number;
};

const EXAMS: ExamSeed[] = [
  {
    title: 'JLPT N3 - 2018 December',
    description: 'Đề thi JLPT N3 chính thức kỳ tháng 12/2018.',
    jlptLevel: JlptLevel.N3,
    type: ExamType.OFFICIAL,
    year: 2018,
    month: 12,
    durationMinutes: 140,
    totalQuestions: 95,
  },
  {
    title: 'JLPT N2 - 2019 July',
    description: 'Đề thi JLPT N2 chính thức kỳ tháng 7/2019.',
    jlptLevel: JlptLevel.N2,
    type: ExamType.OFFICIAL,
    year: 2019,
    month: 7,
    durationMinutes: 155,
    totalQuestions: 105,
  },
  {
    title: 'TacoLearn Mock N3 #1',
    description: 'Đề thi thử N3 do đội ngũ TacoLearn biên soạn.',
    jlptLevel: JlptLevel.N3,
    type: ExamType.MOCK,
    year: null,
    month: null,
    durationMinutes: 140,
    totalQuestions: 95,
  },
  {
    title: 'TacoLearn Mock N2 #1',
    description: 'Đề thi thử N2 do đội ngũ TacoLearn biên soạn.',
    jlptLevel: JlptLevel.N2,
    type: ExamType.MOCK,
    year: null,
    month: null,
    durationMinutes: 155,
    totalQuestions: 105,
  },
  {
    title: 'TacoLearn Mock N4 #1',
    description: 'Đề thi thử N4 do đội ngũ TacoLearn biên soạn.',
    jlptLevel: JlptLevel.N4,
    type: ExamType.MOCK,
    year: null,
    month: null,
    durationMinutes: 125,
    totalQuestions: 90,
  },
];

export async function seedExams(
  prisma: PrismaClient,
  authors: User[],
): Promise<Exam[]> {
  console.log('📝 Seeding exams...');

  const existing = await prisma.exam.findMany();
  if (existing.length > 0) {
    console.log(`⏭️  Exams already seeded (${existing.length}), skipping.`);
    return existing;
  }

  const created = await Promise.all(
    EXAMS.map((data) =>
      prisma.exam.create({
        data: {
          ...data,
          isPublished: true,
          createdById: faker.helpers.arrayElement(authors).id,
        },
      }),
    ),
  );

  console.log(`✅ Exams seeded: ${created.length}`);
  return created;
}
