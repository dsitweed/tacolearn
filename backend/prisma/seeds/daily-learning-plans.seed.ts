import { faker } from '@faker-js/faker';
import {
  PlanStatus,
  Prisma,
  PrismaClient,
  StudentProfile,
} from 'generated/prisma/client';

import { ALL_SKILLS, daysAgo } from './constants';

const PLANS_PER_STUDENT = { min: 3, max: 7 };

const ACTIVITY_TYPES = ['PRACTICE', 'LESSON', 'REVIEW', 'MOCK_TEST'];

function buildActivities(): {
  type: string;
  skill: string;
  count: number;
  timeMinutes: number;
  priority: number;
}[] {
  const count = faker.number.int({ min: 2, max: 4 });
  return Array.from({ length: count }, (_, i) => ({
    type: faker.helpers.arrayElement(ACTIVITY_TYPES),
    skill: faker.helpers.arrayElement(ALL_SKILLS),
    count: faker.number.int({ min: 5, max: 20 }),
    timeMinutes: faker.number.int({ min: 10, max: 40 }),
    priority: i + 1,
  }));
}

export async function seedDailyLearningPlans(
  prisma: PrismaClient,
  studentProfiles: StudentProfile[],
): Promise<number> {
  console.log('📅 Seeding daily learning plans...');

  const existing = await prisma.dailyLearningPlan.count();
  if (existing > 0) {
    console.log(
      `⏭️  Daily learning plans already seeded (${existing}), skipping.`,
    );
    return existing;
  }

  if (studentProfiles.length === 0) {
    console.log('⚠️  No students found, skipping daily learning plans.');
    return 0;
  }

  const rows: Prisma.DailyLearningPlanCreateManyInput[] = [];

  for (const student of studentProfiles) {
    const days = faker.number.int(PLANS_PER_STUDENT);

    for (let d = 0; d < days; d++) {
      const activities = buildActivities();
      const totalTimeMinutes = activities.reduce(
        (sum, a) => sum + a.timeMinutes,
        0,
      );
      const status = faker.helpers.arrayElement([
        PlanStatus.PENDING,
        PlanStatus.IN_PROGRESS,
        PlanStatus.COMPLETED,
        PlanStatus.PARTIAL,
      ]);
      const planDate = daysAgo(d);
      const started = status !== PlanStatus.PENDING ? planDate : null;

      rows.push({
        studentId: student.id,
        planDate,
        activities,
        totalTimeMinutes,
        status,
        startedAt: started,
        completedAt: status === PlanStatus.COMPLETED ? planDate : null,
      });
    }
  }

  const result = await prisma.dailyLearningPlan.createMany({
    data: rows,
    skipDuplicates: true,
  });
  console.log(`✅ Daily learning plans seeded: ${result.count}`);
  return result.count;
}
