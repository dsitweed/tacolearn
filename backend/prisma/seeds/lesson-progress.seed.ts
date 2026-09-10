import { faker } from '@faker-js/faker';
import {
  Lesson,
  LessonProgressStatus,
  Prisma,
  PrismaClient,
  StudentProfile,
} from 'generated/prisma/client';

import { daysAgo, round2 } from './constants';

const LESSONS_PER_STUDENT = { min: 2, max: 6 };

export async function seedLessonProgress(
  prisma: PrismaClient,
  studentProfiles: StudentProfile[],
  lessons: Lesson[],
): Promise<number> {
  console.log('📈 Seeding lesson progress...');

  const existing = await prisma.lessonProgress.count();
  if (existing > 0) {
    console.log(`⏭️  Lesson progress already seeded (${existing}), skipping.`);
    return existing;
  }

  if (studentProfiles.length === 0 || lessons.length === 0) {
    console.log('⚠️  No students or lessons found, skipping lesson progress.');
    return 0;
  }

  const rows: Prisma.LessonProgressCreateManyInput[] = [];

  for (const student of studentProfiles) {
    const picked = faker.helpers.arrayElements(lessons, {
      min: LESSONS_PER_STUDENT.min,
      max: Math.min(LESSONS_PER_STUDENT.max, lessons.length),
    });

    for (const lesson of picked) {
      const status = faker.helpers.arrayElement([
        LessonProgressStatus.NOT_STARTED,
        LessonProgressStatus.IN_PROGRESS,
        LessonProgressStatus.COMPLETED,
        LessonProgressStatus.COMPLETED,
      ]);

      const startedAt =
        status === LessonProgressStatus.NOT_STARTED
          ? null
          : daysAgo(faker.number.int({ min: 1, max: 45 }));
      const isCompleted = status === LessonProgressStatus.COMPLETED;

      rows.push({
        studentId: student.id,
        lessonId: lesson.id,
        status,
        quizScore: isCompleted
          ? round2(faker.number.float({ min: 50, max: 100 }))
          : null,
        startedAt,
        videoWatchedAt: startedAt,
        quizCompletedAt: isCompleted ? startedAt : null,
        completedAt: isCompleted ? startedAt : null,
      });
    }
  }

  const result = await prisma.lessonProgress.createMany({ data: rows });
  console.log(`✅ Lesson progress seeded: ${result.count}`);
  return result.count;
}
