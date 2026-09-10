import { faker } from '@faker-js/faker';
import {
  Prisma,
  PrismaClient,
  QuestionSection,
  StudentProfile,
  TrendDirection,
} from 'generated/prisma/client';

import {
  JLPT_LEVELS,
  SECTIONS,
  SKILLS_BY_SECTION,
  daysAgo,
  round2,
} from './constants';

const TREND_DIRECTIONS: TrendDirection[] = [
  TrendDirection.IMPROVING,
  TrendDirection.STABLE,
  TrendDirection.DECLINING,
];

export async function seedSkillMastery(
  prisma: PrismaClient,
  studentProfiles: StudentProfile[],
): Promise<number> {
  console.log('🎯 Seeding skill mastery...');

  const existing = await prisma.skillMastery.count();
  if (existing > 0) {
    console.log(`⏭️  Skill mastery already seeded (${existing}), skipping.`);
    return existing;
  }

  if (studentProfiles.length === 0) {
    console.log('⚠️  No students found, skipping skill mastery.');
    return 0;
  }

  const rows: Prisma.SkillMasteryCreateManyInput[] = [];

  for (const student of studentProfiles) {
    const jlptLevel = faker.helpers.arrayElement(JLPT_LEVELS);
    const sections = faker.helpers.arrayElements(SECTIONS, { min: 2, max: 4 });

    for (const section of sections) {
      const skills = faker.helpers.arrayElements(SKILLS_BY_SECTION[section], {
        min: 1,
        max: 2,
      });

      for (const skill of skills) {
        const totalAttempts = faker.number.int({ min: 5, max: 60 });
        const correctAnswers = faker.number.int({ min: 0, max: totalAttempts });
        rows.push({
          studentId: student.id,
          jlptLevel,
          section: section as QuestionSection,
          skill,
          correctAnswers,
          totalAttempts,
          masteryPercentage: round2((correctAnswers / totalAttempts) * 100),
          firstAttemptedAt: daysAgo(faker.number.int({ min: 30, max: 90 })),
          lastAttemptedAt: daysAgo(faker.number.int({ min: 1, max: 29 })),
          weeklyProgress: round2(faker.number.float({ min: -10, max: 15 })),
          trendDirection: faker.helpers.arrayElement(TREND_DIRECTIONS),
        });
      }
    }
  }

  const result = await prisma.skillMastery.createMany({
    data: rows,
    skipDuplicates: true,
  });
  console.log(`✅ Skill mastery seeded: ${result.count}`);
  return result.count;
}
