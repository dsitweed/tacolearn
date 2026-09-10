import { faker } from '@faker-js/faker';
import {
  NotificationType,
  Prisma,
  PrismaClient,
  User,
} from 'generated/prisma/client';

import { daysAgo } from './constants';

const NOTIFICATIONS_PER_USER = { min: 2, max: 5 };

const TEMPLATES: Record<NotificationType, { title: string; message: string }> =
  {
    [NotificationType.PRACTICE_REMINDER]: {
      title: 'Đã đến giờ luyện tập!',
      message: 'Hãy hoàn thành bài luyện tập hôm nay để duy trì chuỗi học tập.',
    },
    [NotificationType.ACHIEVEMENT]: {
      title: 'Chúc mừng thành tích mới!',
      message: 'Bạn vừa đạt được một cột mốc học tập mới.',
    },
    [NotificationType.WEAK_AREA_ALERT]: {
      title: 'Cảnh báo điểm yếu',
      message: 'Kỹ năng đọc hiểu của bạn đang cần được ôn luyện thêm.',
    },
    [NotificationType.CLASS_ANNOUNCEMENT]: {
      title: 'Thông báo từ lớp học',
      message: 'Giáo viên vừa đăng một thông báo mới trong lớp của bạn.',
    },
    [NotificationType.MESSAGE]: {
      title: 'Tin nhắn mới',
      message: 'Bạn có một tin nhắn mới cần đọc.',
    },
    [NotificationType.SYSTEM]: {
      title: 'Thông báo hệ thống',
      message: 'Hệ thống TacoLearn vừa được cập nhật tính năng mới.',
    },
  };

const TYPES = Object.keys(TEMPLATES) as NotificationType[];

export async function seedNotifications(
  prisma: PrismaClient,
  users: User[],
): Promise<number> {
  console.log('🔔 Seeding notifications...');

  const existing = await prisma.notification.count();
  if (existing > 0) {
    console.log(`⏭️  Notifications already seeded (${existing}), skipping.`);
    return existing;
  }

  if (users.length === 0) {
    console.log('⚠️  No users found, skipping notifications.');
    return 0;
  }

  const rows: Prisma.NotificationCreateManyInput[] = [];

  for (const user of users) {
    const count = faker.number.int(NOTIFICATIONS_PER_USER);
    for (let i = 0; i < count; i++) {
      const type = faker.helpers.arrayElement(TYPES);
      const template = TEMPLATES[type];
      const isRead = Math.random() < 0.5;
      const createdAt = daysAgo(faker.number.int({ min: 0, max: 14 }));

      rows.push({
        userId: user.id,
        title: template.title,
        message: template.message,
        type,
        isRead,
        readAt: isRead ? createdAt : null,
        createdAt,
      });
    }
  }

  const result = await prisma.notification.createMany({ data: rows });
  console.log(`✅ Notifications seeded: ${result.count}`);
  return result.count;
}
