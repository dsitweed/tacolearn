'use client';

import { toast } from 'sonner';

import {
  DetailedMistakes,
  DiagnosticGapsCard,
  NextStepAdaptiveCard,
  PracticeResultHero,
  SenseiFeedbackNote,
  StrengthsHighlight,
  SyncedSrsQueueCard,
} from '@/features/practice-result';

export default function PracticeResultPage() {
  const handleShare = () => {
    toast.success('Đã sao chép liên kết chia sẻ kết quả vào bộ nhớ tạm!');
  };

  const handleExportPdf = () => {
    toast.info('Đang kết xuất báo cáo bài thi sang tệp PDF (A4)...');
  };

  const handleFixWeakSkills = () => {
    toast.success(
      'Đang tạo phiên luyện bù khuyết điểm 8 phút: Quan điểm tác giả & Suy luận...',
    );
  };

  const handleViewExplanation = (id: number) => {
    toast.info(`Mở bản phân tích chi tiết & ngữ cảnh câu hỏi #${id}`);
  };

  const handlePracticeTargeted = () => {
    toast.success(
      'Bắt đầu bài luyện nhanh 5 câu trọng điểm quan điểm tác giả!',
    );
  };

  const handleRedoWrongAnswers = () => {
    toast.info('Tải lại bài thi chỉ với 3 câu đã làm sai (Câu #4, #7, #9)...');
  };

  return (
    <div className="flex w-full flex-col space-y-8 pb-16">
      {/* 1. Hero Summary & Master KPI Benchmark */}
      <PracticeResultHero
        score={7}
        total={10}
        correctCount={7}
        wrongCount={3}
        accuracy={70}
        timeSpent="14m 32s"
        avgTimePerQuestion="1m 27s"
        onShare={handleShare}
        onExportPdf={handleExportPdf}
      />

      {/* 2. Main Two-Column Analytics & Action Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column (8 Cols): Diagnostic & Deep Mistake Review */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          <DiagnosticGapsCard onFixWeakSkills={handleFixWeakSkills} />
          <DetailedMistakes onViewDetailedExplanation={handleViewExplanation} />
          <StrengthsHighlight />
        </div>

        {/* Right Column (4 Cols): SRS Synced Queue & Next Best Step */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:col-span-4">
          <SyncedSrsQueueCard />
          <NextStepAdaptiveCard
            onPracticeTargeted={handlePracticeTargeted}
            onRedoWrongAnswers={handleRedoWrongAnswers}
          />
          <SenseiFeedbackNote />
        </div>
      </div>
    </div>
  );
}
