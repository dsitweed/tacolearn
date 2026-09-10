import { faker } from '@faker-js/faker';
import {
  PrismaClient,
  School,
  SubscriptionPlan,
  SubscriptionStatus,
  User,
} from 'generated/prisma/client';

type SchoolSeed = {
  name: string;
  description: string;
  city: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  maxStudents: number;
};

const SCHOOLS: SchoolSeed[] = [
  {
    name: 'Sakura Japanese Center',
    description: 'Trung tâm tiếng Nhật Sakura — luyện thi JLPT N5-N2.',
    city: 'Hà Nội',
    subscriptionPlan: SubscriptionPlan.PRO,
    subscriptionStatus: SubscriptionStatus.ACTIVE,
    maxStudents: 500,
  },
  {
    name: 'Fuji Language School',
    description: 'Trường Nhật ngữ Fuji — đào tạo từ sơ cấp đến cao cấp.',
    city: 'Hồ Chí Minh',
    subscriptionPlan: SubscriptionPlan.BASIC,
    subscriptionStatus: SubscriptionStatus.TRIAL,
    maxStudents: 150,
  },
];

export async function seedSchools(
  prisma: PrismaClient,
  owners: User[],
): Promise<School[]> {
  console.log('🏫 Seeding schools...');

  const existing = await prisma.school.findMany();
  if (existing.length > 0) {
    console.log(`⏭️  Schools already seeded (${existing.length}), skipping.`);
    return existing;
  }

  const created = await Promise.all(
    SCHOOLS.map((data, index) =>
      prisma.school.create({
        data: {
          name: data.name,
          description: data.description,
          logo: `https://logos.tacolearn.com/${faker.string.uuid()}.png`,
          address: faker.location.streetAddress(),
          city: data.city,
          country: 'Vietnam',
          subscriptionPlan: data.subscriptionPlan,
          subscriptionStatus: data.subscriptionStatus,
          maxStudents: data.maxStudents,
          isActive: true,
          ownerId: owners[index % owners.length].id,
        },
      }),
    ),
  );

  console.log(`✅ Schools seeded: ${created.length}`);
  return created;
}
