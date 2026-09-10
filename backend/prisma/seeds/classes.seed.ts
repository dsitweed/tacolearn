import { faker } from '@faker-js/faker';
import {
  Class,
  ClassStatus,
  PrismaClient,
  School,
  TeacherProfile,
} from 'generated/prisma/client';

import { JLPT_LEVELS } from './constants';

const CLASSES_PER_SCHOOL = 3;

const SCHEDULE_TEMPLATES = [
  [
    { day: 'Monday', time: '18:00', durationMinutes: 90 },
    { day: 'Wednesday', time: '18:00', durationMinutes: 90 },
  ],
  [
    { day: 'Tuesday', time: '19:00', durationMinutes: 120 },
    { day: 'Thursday', time: '19:00', durationMinutes: 120 },
  ],
  [{ day: 'Saturday', time: '09:00', durationMinutes: 180 }],
];

export async function seedClasses(
  prisma: PrismaClient,
  schools: School[],
  teacherProfiles: TeacherProfile[],
): Promise<Class[]> {
  console.log('👨‍🏫 Seeding classes...');

  const existing = await prisma.class.findMany();
  if (existing.length > 0) {
    console.log(`⏭️  Classes already seeded (${existing.length}), skipping.`);
    return existing;
  }

  if (teacherProfiles.length === 0) {
    console.log('⚠️  No teacher profiles found, skipping classes.');
    return [];
  }

  const created: Class[] = [];

  for (const school of schools) {
    for (let i = 1; i <= CLASSES_PER_SCHOOL; i++) {
      const jlptLevel = faker.helpers.arrayElement(JLPT_LEVELS);
      const cls = await prisma.class.create({
        data: {
          schoolId: school.id,
          teacherId: faker.helpers.arrayElement(teacherProfiles).id,
          name: `${jlptLevel} Class ${i}`,
          jlptLevel,
          schedule: faker.helpers.arrayElement(SCHEDULE_TEMPLATES),
          maxStudents: faker.number.int({ min: 15, max: 30 }),
          status: ClassStatus.ACTIVE,
        },
      });
      created.push(cls);
    }
  }

  console.log(`✅ Classes seeded: ${created.length}`);
  return created;
}
