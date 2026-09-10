'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  AttendanceHealthCard,
  AttendanceSyncMechanismCard,
  CatchUpFourStages,
  CatchUpHeaderBanner,
  CatchUpVideoPlayer,
  TeacherDirectMessageCard,
} from '@/features/catch-up';

export default function CatchUpPage() {
  const [completedStages, setCompletedStages] = useState<
    Record<number, boolean>
  >({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const pipelineRef = useRef<HTMLDivElement>(null);

  const completedCount = Object.values(completedStages).filter(Boolean).length;
  const totalStages = 4;

  const handleToggleStage = (stageIndex: number) => {
    setCompletedStages((prev) => {
      const nextState = !prev[stageIndex];
      const updated = { ...prev, [stageIndex]: nextState };

      if (nextState) {
        toast.success(`Đã hoàn thành Chặng 0${stageIndex}!`);
      }

      // Check if all completed
      const allDone =
        Object.values(updated).filter(Boolean).length === totalStages;
      if (allDone) {
        toast.success(
          'Chúc mừng! Bạn đã hoàn thành 4 chặng. Trạng thái vắng mặt đang được tự động khôi phục!',
        );
      }

      return updated;
    });
  };

  const handleScrollToPipeline = () => {
    if (pipelineRef.current) {
      pipelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 pb-16">
      {/* 1. Top Ambient Halo Banner */}
      <CatchUpHeaderBanner
        completedTasks={completedCount}
        totalTasks={totalStages}
        onStartClick={handleScrollToPipeline}
      />

      {/* 2. Main Content Layout (65% / 35% Grid) */}
      <div
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12"
        ref={pipelineRef}
      >
        {/* Left Column: Digest & Verification Pipeline (65% ~ 8 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
          <CatchUpVideoPlayer />
          <CatchUpFourStages
            completedStages={completedStages}
            onToggleStage={handleToggleStage}
          />
        </div>

        {/* Right Column: Attendance Impact & Automated Sync (35% ~ 4 cols) */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:col-span-5 xl:col-span-4">
          <AttendanceSyncMechanismCard />
          <AttendanceHealthCard />
          <TeacherDirectMessageCard />
        </div>
      </div>
    </div>
  );
}
