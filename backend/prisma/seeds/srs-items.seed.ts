import { faker } from '@faker-js/faker';
import {
  ConfidenceLevel,
  GrammarPoint,
  Prisma,
  PrismaClient,
  Question,
  SrsContentType,
  SrsItemOrigin,
  SrsStatus,
  StudentProfile,
  Vocabulary,
} from 'generated/prisma/client';

import { daysAgo, daysFromNow, round2 } from './constants';

const CONFIDENCE_LEVELS: ConfidenceLevel[] = [
  ConfidenceLevel.VERY_LOW,
  ConfidenceLevel.LOW,
  ConfidenceLevel.MEDIUM,
  ConfidenceLevel.HIGH,
  ConfidenceLevel.VERY_HIGH,
];

const STATUSES: SrsStatus[] = [
  SrsStatus.NEW,
  SrsStatus.LEARNING,
  SrsStatus.REVIEW,
  SrsStatus.GRADUATED,
];

type SeedSrsOptions = {
  studentProfiles: StudentProfile[];
  questions: Question[];
  vocabulary: Vocabulary[];
  grammarPoints: GrammarPoint[];
};

export async function seedSrsItems(
  prisma: PrismaClient,
  { studentProfiles, questions, vocabulary, grammarPoints }: SeedSrsOptions,
): Promise<number> {
  console.log('🔁 Seeding SRS items...');

  const existing = await prisma.srsItem.count();
  if (existing > 0) {
    console.log(`⏭️  SRS items already seeded (${existing}), skipping.`);
    return existing;
  }

  if (studentProfiles.length === 0) {
    console.log('⚠️  No students found, skipping SRS items.');
    return 0;
  }

  const rows: Prisma.SrsItemCreateManyInput[] = [];

  const buildItem = (
    studentId: string,
    contentId: string,
    contentType: SrsContentType,
    origin: SrsItemOrigin,
  ): Prisma.SrsItemCreateManyInput => {
    const stage = faker.number.int({ min: 0, max: 5 });
    const reviewCount = faker.number.int({ min: 0, max: 12 });
    return {
      studentId,
      contentId,
      contentType,
      origin,
      stage,
      easeFactor: round2(faker.number.float({ min: 1.3, max: 2.8 })),
      intervalDays: faker.number.int({ min: 1, max: 30 }),
      reviewCount,
      lastReviewedAt:
        reviewCount > 0 ? daysAgo(faker.number.int({ min: 1, max: 20 })) : null,
      nextReviewAt: daysFromNow(faker.number.int({ min: 0, max: 15 })),
      lastConfidenceRating: faker.helpers.arrayElement(CONFIDENCE_LEVELS),
      averageConfidence: round2(faker.number.float({ min: 1, max: 5 })),
      status: faker.helpers.arrayElement(STATUSES),
    };
  };

  for (const student of studentProfiles) {
    // Wrong questions captured from practice
    if (questions.length > 0) {
      faker.helpers
        .arrayElements(questions, { min: 3, max: 8 })
        .forEach((q) =>
          rows.push(
            buildItem(
              student.id,
              q.id,
              SrsContentType.QUESTION,
              SrsItemOrigin.MISTAKE,
            ),
          ),
        );
    }

    // Vocabulary manually saved by the student
    if (vocabulary.length > 0) {
      faker.helpers
        .arrayElements(vocabulary, { min: 2, max: 6 })
        .forEach((v) =>
          rows.push(
            buildItem(
              student.id,
              v.id,
              SrsContentType.VOCABULARY,
              SrsItemOrigin.SAVED,
            ),
          ),
        );
    }

    // Grammar points added by the review scheduler
    if (grammarPoints.length > 0) {
      faker.helpers
        .arrayElements(grammarPoints, { min: 1, max: 4 })
        .forEach((g) =>
          rows.push(
            buildItem(
              student.id,
              g.id,
              SrsContentType.GRAMMAR,
              faker.helpers.arrayElement([
                SrsItemOrigin.SAVED,
                SrsItemOrigin.AUTO,
              ]),
            ),
          ),
        );
    }
  }

  const result = await prisma.srsItem.createMany({
    data: rows,
    skipDuplicates: true,
  });
  console.log(`✅ SRS items seeded: ${result.count}`);
  return result.count;
}
