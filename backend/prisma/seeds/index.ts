import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

import { seedAnnouncements } from './announcements.seed';
import { seedAttendances } from './attendances.seed';
import { seedClassEnrollments } from './class-enrollments.seed';
import { seedClasses } from './classes.seed';
import { seedDailyLearningPlans } from './daily-learning-plans.seed';
import { seedExams } from './exams.seed';
import { seedGrammarPoints } from './grammar-points.seed';
import { seedLessonProgress } from './lesson-progress.seed';
import { seedLessons } from './lessons.seed';
import { seedNotifications } from './notifications.seed';
import { seedPracticeSessions } from './practice-sessions.seed';
import { seedQuestions } from './questions.seed';
import { seedSchools } from './schools.seed';
import { seedSkillMastery } from './skill-mastery.seed';
import { seedSrsItems } from './srs-items.seed';
import { seedUsers } from './users.seed';
import { seedVocabulary } from './vocabulary.seed';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  console.log('🌱 Starting seed...\n');

  try {
    // 1. Identity
    const { adminUsers, teacherUsers, studentUsers } = await seedUsers(prisma);
    const authors = [...adminUsers, ...teacherUsers];
    const allUsers = [...adminUsers, ...teacherUsers, ...studentUsers];

    const teacherProfiles = await prisma.teacherProfile.findMany();
    const studentProfiles = await prisma.studentProfile.findMany();

    // 2. Learning content
    const vocabulary = await seedVocabulary(prisma);
    const grammarPoints = await seedGrammarPoints(prisma);
    const exams = await seedExams(prisma, authors);
    const questions = await seedQuestions(prisma, {
      authors,
      exams,
      vocabulary,
      grammarPoints,
    });
    const lessons = await seedLessons(prisma, {
      authors,
      questions,
      vocabulary,
      grammarPoints,
    });

    // 3. School & class management
    const schools = await seedSchools(prisma, adminUsers);
    const classes = await seedClasses(prisma, schools, teacherProfiles);
    const enrollments = await seedClassEnrollments(
      prisma,
      classes,
      studentProfiles,
    );
    const attendances = await seedAttendances(prisma, enrollments);

    // 4. Learning engine
    const sessions = await seedPracticeSessions(
      prisma,
      studentProfiles,
      questions,
      exams,
    );
    const lessonProgress = await seedLessonProgress(
      prisma,
      studentProfiles,
      lessons,
    );
    const skillMastery = await seedSkillMastery(prisma, studentProfiles);
    const srsItems = await seedSrsItems(prisma, {
      studentProfiles,
      questions,
      vocabulary,
      grammarPoints,
    });
    const dailyPlans = await seedDailyLearningPlans(prisma, studentProfiles);

    // 5. Communication
    const announcements = await seedAnnouncements(
      prisma,
      schools,
      classes,
      authors,
    );
    const notifications = await seedNotifications(prisma, allUsers);

    console.log('\n📊 ===== SEEDING SUMMARY =====');
    console.log(`👥 Users: ${allUsers.length}`);
    console.log(`   - Admins: ${adminUsers.length}`);
    console.log(`   - Teachers: ${teacherUsers.length}`);
    console.log(`   - Students: ${studentUsers.length}`);
    console.log(`📚 Vocabulary: ${vocabulary.length}`);
    console.log(`📐 Grammar points: ${grammarPoints.length}`);
    console.log(`📝 Exams: ${exams.length}`);
    console.log(`❓ Questions: ${questions.length}`);
    console.log(`🎬 Lessons: ${lessons.length}`);
    console.log(`🏫 Schools: ${schools.length}`);
    console.log(`👨‍🏫 Classes: ${classes.length}`);
    console.log(`🎓 Class enrollments: ${enrollments.length}`);
    console.log(`🗓️  Attendances: ${attendances}`);
    console.log(`🧩 Practice sessions: ${sessions}`);
    console.log(`📈 Lesson progress: ${lessonProgress}`);
    console.log(`🎯 Skill mastery: ${skillMastery}`);
    console.log(`🔁 SRS items: ${srsItems}`);
    console.log(`📅 Daily learning plans: ${dailyPlans}`);
    console.log(`📢 Announcements: ${announcements}`);
    console.log(`🔔 Notifications: ${notifications}`);
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
