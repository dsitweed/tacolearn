'use client';

import {
  AiDiagnosticsCard,
  ClassroomSyncAlertBanner,
  DashboardKpiCards,
  DashboardWelcomeBanner,
  SkillBreakdownSection,
  TeachersNoteCard,
  TodaysPrioritiesSection,
  WeeklyScheduleCard,
} from '@/features/dashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Header Welcome Area */}
      <DashboardWelcomeBanner />

      {/* 2. Top Metric KPI Cards (4 Grid Cards) */}
      <DashboardKpiCards />

      {/* 3. Prominent Banner: Classroom Sync Alert */}
      <ClassroomSyncAlertBanner />

      {/* 4. Main Content Area (65% / 35% Grid) */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column (65% ~ 8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          <TodaysPrioritiesSection />
          <SkillBreakdownSection />
        </div>

        {/* Right Column (35% ~ 4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <AiDiagnosticsCard />
          <WeeklyScheduleCard />
          <TeachersNoteCard />
        </div>
      </div>
    </div>
  );
}
