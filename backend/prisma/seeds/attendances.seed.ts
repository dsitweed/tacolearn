import { faker } from '@faker-js/faker';
import {
  AttendanceStatus,
  ClassEnrollment,
  Prisma,
  PrismaClient,
} from 'generated/prisma/client';

import { daysAgo } from './constants';

const SESSION_DATES_PER_CLASS = 4;

const STATUSES: AttendanceStatus[] = [
  AttendanceStatus.PRESENT,
  AttendanceStatus.PRESENT,
  AttendanceStatus.PRESENT,
  AttendanceStatus.LATE,
  AttendanceStatus.ABSENT,
  AttendanceStatus.EXCUSED,
];

export async function seedAttendances(
  prisma: PrismaClient,
  enrollments: ClassEnrollment[],
): Promise<number> {
  console.log('🗓️  Seeding attendances...');

  const existing = await prisma.attendance.count();
  if (existing > 0) {
    console.log(`⏭️  Attendances already seeded (${existing}), skipping.`);
    return existing;
  }

  if (enrollments.length === 0) {
    console.log('⚠️  No enrollments found, skipping attendances.');
    return 0;
  }

  // Group active enrollments by class to share the same session dates.
  const byClass = new Map<string, ClassEnrollment[]>();
  for (const enrollment of enrollments) {
    if (enrollment.status !== 'ACTIVE') continue;
    const list = byClass.get(enrollment.classId) ?? [];
    list.push(enrollment);
    byClass.set(enrollment.classId, list);
  }

  const rows: Prisma.AttendanceCreateManyInput[] = [];

  for (const classEnrollments of byClass.values()) {
    const sessionDates = Array.from(
      { length: SESSION_DATES_PER_CLASS },
      (_, i) => daysAgo((i + 1) * 7),
    );

    for (const date of sessionDates) {
      for (const enrollment of classEnrollments) {
        const status = faker.helpers.arrayElement(STATUSES);
        rows.push({
          classId: enrollment.classId,
          studentId: enrollment.studentId,
          date,
          status,
          notes:
            status === AttendanceStatus.ABSENT ||
            status === AttendanceStatus.EXCUSED
              ? faker.lorem.sentence()
              : null,
        });
      }
    }
  }

  const result = await prisma.attendance.createMany({ data: rows });
  console.log(`✅ Attendances seeded: ${result.count}`);
  return result.count;
}
