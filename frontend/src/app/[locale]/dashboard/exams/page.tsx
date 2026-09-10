'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import {
  AdaptiveWeakPointBanner,
  ExamFilterBar,
  ExamHeaderBanner,
  ExamSidebarSummary,
  FullMockExamSection,
  MistakeBankSection,
  SpecializedDrillsSection,
} from '@/features/exams';

export default function ExamsHubPage() {
  const [selectedLevel, setSelectedLevel] = useState('N2');
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUnattempted, setOnlyUnattempted] = useState(false);
  const [hasVideoSolution, setHasVideoSolution] = useState(false);
  const [aiCompiledOnly, setAiCompiledOnly] = useState(false);

  const handleStartAdaptivePractice = () => {
    toast.success(
      'Bắt đầu phiên Luyện Thích Ứng Điểm Yếu (15 phút · 10 câu chọn lọc)!',
    );
  };

  const handleCustomizeSession = () => {
    toast.info('Mở bảng tùy biến thông số thuật toán Adaptive Diagnostic.');
  };

  const handlePracticeMistakes = () => {
    toast.success('Bắt đầu phiên phục thù 42 câu hỏi sai từ Mistake Bank!');
  };

  return (
    <div className="flex w-full flex-col space-y-6 pb-16">
      {/* 1. Top Breadcrumb & Header Action Banner */}
      <ExamHeaderBanner
        onMyStatsClick={() =>
          toast.info('Mở bảng thống kê chi tiết điểm thi qua các kỳ.')
        }
        onHistoryClick={() =>
          toast.info('Mở danh sách lịch sử các lượt làm bài gần đây.')
        }
      />

      {/* 2. AI Adaptive Hero Banner (Weak Point Practice) */}
      <AdaptiveWeakPointBanner
        onStartAdaptivePractice={handleStartAdaptivePractice}
        onCustomizeSession={handleCustomizeSession}
      />

      {/* 3. Filter & JLPT Level Selector Bar */}
      <ExamFilterBar
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onlyUnattempted={onlyUnattempted}
        onToggleUnattempted={() => setOnlyUnattempted((p) => !p)}
        hasVideoSolution={hasVideoSolution}
        onToggleVideoSolution={() => setHasVideoSolution((p) => !p)}
        aiCompiledOnly={aiCompiledOnly}
        onToggleAiCompiled={() => setAiCompiledOnly((p) => !p)}
      />

      {/* 4. Main Practice Hub Grid With Side Summary */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
        {/* Left / Main Practice Content (Col 8/12) */}
        <div className="flex flex-col space-y-8 xl:col-span-8">
          <FullMockExamSection />
          <SpecializedDrillsSection />
          <MistakeBankSection onPracticeMistakes={handlePracticeMistakes} />
        </div>

        {/* Right Summary Panel (Col 4/12) */}
        <div className="flex flex-col space-y-6 xl:sticky xl:top-20 xl:col-span-4">
          <ExamSidebarSummary />
        </div>
      </div>
    </div>
  );
}
