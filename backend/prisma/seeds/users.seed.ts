import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
import { PrismaClient, User, UserRole } from 'generated/prisma/client';

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  dateOfBirth: Date;
};

const hashPassword = async () => argon.hash('password');

export async function seedUsers(prisma: PrismaClient): Promise<{
  adminUsers: User[];
  regularUsers: User[];
}> {
  console.log('👤 Seeding users...');

  const adminUsers = await seedByRole(prisma, UserRole.ADMIN, 'admin', 3);
  const regularUsers = await seedByRole(prisma, UserRole.USER, 'user', 10);

  console.log('✅ All user groups seeded successfully!');

  return { adminUsers, regularUsers };
}

async function seedByRole(
  prisma: PrismaClient,
  role: UserRole,
  emailPrefix: string,
  count: number,
): Promise<User[]> {
  console.log(`👤 Seeding ${role} users...`);

  const hashedPassword = await hashPassword();
  const usersData: UserData[] = [];

  for (let i = 1; i <= count; i++) {
    const email = `${emailPrefix}${i}@example.com`;

    usersData.push({
      email,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      phone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate({ min: 22, max: 55, mode: 'age' }),
    });
  }

  const users = await Promise.all(
    usersData.map(async (data) => {
      const userId = faker.string.uuid();

      return prisma.user.upsert({
        where: { email: data.email },
        update: {},
        create: {
          id: userId,
          email: data.email,
          role,
          isActive: true,
          profile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              avatar: data.avatar,
              dateOfBirth: data.dateOfBirth,
            },
          },
          accounts: {
            create: {
              providerId: 'credential',
              accountId: userId,
              password: hashedPassword,
            },
          },
        },
      });
    }),
  );

  console.log(`✅ ${role} users seeded: ${users.length}`);
  return users;
}
