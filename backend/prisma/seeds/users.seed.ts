import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
import {
  JlptLevel,
  PrismaClient,
  User,
  UserRole,
} from 'generated/prisma/client';

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  dateOfBirth: Date;
};

const hashPassword = async () => argon.hash('password');

const JLPT_LEVELS: JlptLevel[] = [
  JlptLevel.N1,
  JlptLevel.N2,
  JlptLevel.N3,
  JlptLevel.N4,
  JlptLevel.N5,
];

export async function seedUsers(prisma: PrismaClient): Promise<{
  adminUsers: User[];
  teacherUsers: User[];
  studentUsers: User[];
}> {
  console.log('👤 Seeding users...');

  const adminUsers = await seedByRole(prisma, UserRole.ADMIN, 'admin', 2);
  const teacherUsers = await seedByRole(prisma, UserRole.TEACHER, 'teacher', 5);
  const studentUsers = await seedByRole(
    prisma,
    UserRole.STUDENT,
    'student',
    15,
  );

  console.log('✅ All user groups seeded successfully!');

  return { adminUsers, teacherUsers, studentUsers };
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
      dateOfBirth: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
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
          ...(role === UserRole.STUDENT && {
            studentProfile: {
              create: {
                jlptGoalLevel: faker.helpers.arrayElement(JLPT_LEVELS),
                jlptGoalDate: faker.date.future({ years: 1 }),
              },
            },
          }),
          ...(role === UserRole.TEACHER && {
            teacherProfile: {
              create: {
                specialization: faker.helpers.arrayElement([
                  'Grammar',
                  'Reading',
                  'Listening',
                  'Vocabulary',
                ]),
                yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
              },
            },
          }),
        },
      });
    }),
  );

  console.log(`✅ ${role} users seeded: ${users.length}`);
  return users;
}
