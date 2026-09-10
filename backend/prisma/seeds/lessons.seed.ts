import { faker } from '@faker-js/faker';
import {
  GrammarPoint,
  Lesson,
  LessonDifficulty,
  PrismaClient,
  Question,
  User,
  Vocabulary,
} from 'generated/prisma/client';

import { JLPT_LEVELS, SECTIONS } from './constants';

const TOTAL_LESSONS = 20;

const DIFFICULTIES: LessonDifficulty[] = [
  LessonDifficulty.BEGINNER,
  LessonDifficulty.INTERMEDIATE,
  LessonDifficulty.ADVANCED,
];

type SeedLessonOptions = {
  authors: User[];
  questions: Question[];
  vocabulary: Vocabulary[];
  grammarPoints: GrammarPoint[];
};

export async function seedLessons(
  prisma: PrismaClient,
  { authors, questions, vocabulary, grammarPoints }: SeedLessonOptions,
): Promise<Lesson[]> {
  console.log('🎬 Seeding lessons...');

  const existing = await prisma.lesson.findMany();
  if (existing.length > 0) {
    console.log(`⏭️  Lessons already seeded (${existing.length}), skipping.`);
    return existing;
  }

  const created: Lesson[] = [];

  for (let i = 1; i <= TOTAL_LESSONS; i++) {
    const jlptLevel = faker.helpers.arrayElement(JLPT_LEVELS);
    const section = faker.helpers.arrayElement(SECTIONS);
    const videoDurationMinutes = faker.number.int({ min: 5, max: 25 });

    const lesson = await prisma.lesson.create({
      data: {
        title: `${jlptLevel} ${section} — Bài học ${i}: ${faker.lorem.words(3)}`,
        description: faker.lorem.sentence(),
        jlptLevel,
        section,
        videoUrl: `https://videos.tacolearn.com/lessons/${faker.string.uuid()}.mp4`,
        videoDurationMinutes,
        transcript: faker.lorem.paragraphs(2),
        estimatedDurationMinutes:
          videoDurationMinutes + faker.number.int({ min: 5, max: 15 }),
        difficulty: faker.helpers.arrayElement(DIFFICULTIES),
        createdById: faker.helpers.arrayElement(authors).id,
        ...(questions.length > 0 && {
          questions: {
            connect: faker.helpers
              .arrayElements(questions, { min: 2, max: 5 })
              .map((q) => ({ id: q.id })),
          },
        }),
        ...(vocabulary.length > 0 && {
          vocabulary: {
            connect: faker.helpers
              .arrayElements(vocabulary, { min: 2, max: 4 })
              .map((v) => ({ id: v.id })),
          },
        }),
        ...(grammarPoints.length > 0 && {
          grammarPoints: {
            connect: faker.helpers
              .arrayElements(grammarPoints, { min: 1, max: 3 })
              .map((g) => ({ id: g.id })),
          },
        }),
      },
    });

    created.push(lesson);
  }

  console.log(`✅ Lessons seeded: ${created.length}`);
  return created;
}
