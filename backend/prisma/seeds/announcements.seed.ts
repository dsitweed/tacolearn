import { faker } from '@faker-js/faker';
import {
  Class,
  Prisma,
  PrismaClient,
  School,
  User,
} from 'generated/prisma/client';

import { daysAgo, daysFromNow } from './constants';

const SCHOOL_ANNOUNCEMENTS = 2;
const CLASS_ANNOUNCEMENTS = 1;

export async function seedAnnouncements(
  prisma: PrismaClient,
  schools: School[],
  classes: Class[],
  authors: User[],
): Promise<number> {
  console.log('📢 Seeding announcements...');

  const existing = await prisma.announcement.count();
  if (existing > 0) {
    console.log(`⏭️  Announcements already seeded (${existing}), skipping.`);
    return existing;
  }

  if (authors.length === 0) {
    console.log('⚠️  No authors found, skipping announcements.');
    return 0;
  }

  const rows: Prisma.AnnouncementCreateManyInput[] = [];

  for (const school of schools) {
    for (let i = 0; i < SCHOOL_ANNOUNCEMENTS; i++) {
      rows.push({
        schoolId: school.id,
        classId: null,
        createdById: school.ownerId,
        title: faker.helpers.arrayElement([
          'Thông báo lịch nghỉ lễ',
          'Khai giảng khóa học mới',
          'Cập nhật quy định lớp học',
        ]),
        content: faker.lorem.paragraph(),
        postedAt: daysAgo(faker.number.int({ min: 1, max: 30 })),
        expiresAt: daysFromNow(faker.number.int({ min: 10, max: 40 })),
      });
    }
  }

  for (const cls of classes) {
    for (let i = 0; i < CLASS_ANNOUNCEMENTS; i++) {
      rows.push({
        schoolId: null,
        classId: cls.id,
        createdById: faker.helpers.arrayElement(authors).id,
        title: faker.helpers.arrayElement([
          'Bài tập về nhà tuần này',
          'Lịch kiểm tra giữa kỳ',
          'Tài liệu ôn tập bổ sung',
        ]),
        content: faker.lorem.paragraph(),
        postedAt: daysAgo(faker.number.int({ min: 1, max: 20 })),
        expiresAt: null,
      });
    }
  }

  const result = await prisma.announcement.createMany({ data: rows });
  console.log(`✅ Announcements seeded: ${result.count}`);
  return result.count;
}
