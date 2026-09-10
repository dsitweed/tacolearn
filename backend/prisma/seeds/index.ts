import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

import { seedUsers } from './users.seed';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  console.log('🌱 Starting seed...');

  try {
    const { adminUsers, regularUsers } = await seedUsers(prisma);

    console.log('\n📊 ===== SEEDING SUMMARY =====');
    console.log(`👥 Users: ${adminUsers.length + regularUsers.length} total`);
    console.log(`   - Admins: ${adminUsers.length}`);
    console.log(`   - Users: ${regularUsers.length}`);
    console.log('=============================\n');
    console.log('✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
