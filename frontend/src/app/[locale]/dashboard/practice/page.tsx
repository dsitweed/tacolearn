'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import {
  PracticeHeader,
  PracticeSetupPanel,
  QuestionInterface,
  RecommendationBanner,
} from '@/features/practice';

export default function PracticeHubPage() {
  const [level, setLevel] = useState('N2');
  const [section, setSection] = useState('dokkai');
  const [mode, setMode] = useState('weakness');
  const [questionCount, setQuestionCount] = useState(10);

  const [currentQuestion, setCurrentQuestion] = useState(4);
  const totalQuestions = 10;
  const [selectedOption, setSelectedOption] = useState<string | null>('B');
  const [showExplanation, setShowExplanation] = useState(true);

  const [answersState, setAnswersState] = useState<
    Record<number, { isCorrect: boolean; selected: string }>
  >({
    1: { isCorrect: true, selected: 'A' },
    2: { isCorrect: true, selected: 'C' },
    3: { isCorrect: false, selected: 'D' },
    4: { isCorrect: true, selected: 'B' },
  });

  const handleSelectOption = (optKey: string) => {
    setSelectedOption(optKey);
    const isCorrect = optKey === 'B';
    setAnswersState((prev) => ({
      ...prev,
      [currentQuestion]: { isCorrect, selected: optKey },
    }));
    setShowExplanation(true);
    if (isCorrect) {
      toast.success('Chính xác! +12 Điểm Thích ứng');
    } else {
      toast.error(
        'Chưa chính xác! Xem giải thích bên dưới để rút kinh nghiệm.',
      );
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      toast.info('Bạn đã hoàn thành phiên luyện tập! Đang tạo bảng phân tích.');
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(answersState[currentQuestion - 1]?.selected ?? null);
      setShowExplanation(Boolean(answersState[currentQuestion - 1]));
    }
  };

  return (
    <div className="flex w-full flex-col pb-16">
      {/* 1. Breadcrumb & Page Header */}
      <PracticeHeader />

      {/* 2. Top Recommendation Banner */}
      <RecommendationBanner
        onStart15mPractice={() => {
          toast.success('Bắt đầu phiên luyện tập điểm yếu 15 phút!');
        }}
        onSelectWeakness={(idx) => {
          toast.info(`Đã chọn luyện phân vùng điểm yếu #${idx}`);
        }}
      />

      {/* 3. Practice Setup Panel */}
      <PracticeSetupPanel
        level={level}
        onLevelChange={setLevel}
        section={section}
        onSectionChange={setSection}
        mode={mode}
        onModeChange={setMode}
        questionCount={questionCount}
        onQuestionCountChange={setQuestionCount}
        onResetConfig={() => toast.info('Đã tải lại cấu hình mặc định')}
        onRefreshQuestions={() =>
          toast.success('Đã làm mới bộ câu hỏi thích ứng!')
        }
      />

      {/* 4. Active Question Experience Interface */}
      <QuestionInterface
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        onSelectQuestion={(num) => {
          setCurrentQuestion(num);
          setSelectedOption(answersState[num]?.selected ?? null);
          setShowExplanation(Boolean(answersState[num]));
        }}
        answersState={answersState}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
        showExplanation={showExplanation}
        onNextQuestion={handleNext}
        onPrevQuestion={handlePrev}
      />
    </div>
  );
}
