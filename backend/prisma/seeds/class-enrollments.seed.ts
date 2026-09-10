import { faker } from '@faker-js/faker';
import {
  Class,
  ClassEnrollment,
  EnrollmentStatus,
  PrismaClient,
  StudentProfile,
} from 'generated/prisma/client';

import { daysAgo } from './constants';

export async function seedClassEnrollments(
  prisma: PrismaClient,
  classes: Class[],
  studentProfiles: StudentProfile[],
): Promise<ClassEnrollment[]> {
  console.log('🎓 Seeding class enrollments...');

  const existing = await prisma.classEnrollment.findMany();
  if (existing.length > 0) {
    console.log(
      `⏭️  Class enrollments already seeded (${existing.length}), skipping.`,
    );
    return existing;
  }

  if (classes.length === 0 || studentProfiles.length === 0) {
    console.log('⚠️  No classes or students found, skipping enrollments.');
    return [];
  }

  const created: ClassEnrollment[] = [];

  for (const cls of classes) {
    const students = faker.helpers.arrayElements(studentProfiles, {
      min: 4,
      max: Math.min(10, studentProfiles.length),
    });

    for (const student of students) {
      const dropped = Math.random() < 0.1;
      const enrollment = await prisma.classEnrollment.create({
        data: {
          classId: cls.id,
          studentId: student.id,
          status: dropped ? EnrollmentStatus.DROPPED : EnrollmentStatus.ACTIVE,
          enrolledAt: daysAgo(faker.number.int({ min: 30, max: 120 })),
          droppedAt: dropped
            ? daysAgo(faker.number.int({ min: 1, max: 20 }))
            : null,
        },
      });
      created.push(enrollment);
    }
  }

  console.log(`✅ Class enrollments seeded: ${created.length}`);
  return created;
}
