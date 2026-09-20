'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { PracticeHeader } from '@/features/practice';
import { PracticeSetupPanel } from '@/features/practice';
import { QuestionInterface } from '@/features/practice';
import { RecommendationBanner } from '@/features/practice';
import type { Question } from '@/features/practice/hooks/useQuestions';
import {
  useCompletePracticeSession,
  useCreatePracticeSession,
} from '@/features/practice/hooks/useQuestions';
import { apiClient } from '@/libs/apiClient';
import { ApiResponse } from '@/types';

export default function PracticeHubPage() {
  const router = useRouter();
  const [level, setLevel] = useState('N2');
  const [section, setSection] = useState('dokkai');
  const [mode, setMode] = useState('weakness');
  const [questionCount, setQuestionCount] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const createSessionMutation = useCreatePracticeSession();
  const completeSessionMutation = useCompletePracticeSession();

  const fetchRandomQuestions = useCallback(async () => {
    const response = await apiClient.get<ApiResponse<Question[]>>(
      '/questions/random',
      {
        params: { level, section, count: questionCount },
      },
    );
    return response.data as unknown as Question[];
  }, [level, section, questionCount]);

  const handleRefreshQuestions = useCallback(async () => {
    try {
      const data = await fetchRandomQuestions();
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentIndex(0);
        setSessionId(null);
        toast.success('Đã tải bộ câu hỏi mới!');
      } else {
        toast.info('Không có câu hỏi nào cho cấu hình này');
      }
    } catch {
      toast.error('Không thể tải câu hỏi');
    }
  }, [fetchRandomQuestions]);

  const handleStartPractice = useCallback(async () => {
    if (questions.length === 0) {
      toast.info('Vui lòng tải câu hỏi trước');
      return;
    }

    try {
      const questionIds = questions.map((q) => q.id);
      const result = await createSessionMutation.mutateAsync({
        sessionType: mode === 'weakness' ? 'TARGETED' : 'MIXED',
        jlptLevel: level,
        totalQuestions: questions.length,
        questionIds,
        studentId: 'user-1',
      });
      setSessionId((result as any).id);
      toast.success('Đã bắt đầu phiên luyện tập!');
    } catch {
      toast.error('Không thể tạo phiên luyện tập');
    }
  }, [questions, level, mode, createSessionMutation]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleCompletePractice();
    }
  }, [currentIndex, questions.length]);

  const handlePrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleCompletePractice = useCallback(async () => {
    if (sessionId) {
      try {
        await completeSessionMutation.mutateAsync(sessionId);
        router.push('/dashboard/practice-result');
      } catch {
        toast.error('Không thể hoàn thành phiên luyện');
      }
    } else {
      router.push('/dashboard/practice-result');
    }
  }, [sessionId, completeSessionMutation, router]);

  const handleResetConfig = useCallback(() => {
    setLevel('N2');
    setSection('dokkai');
    setMode('weakness');
    setQuestionCount(10);
    setQuestions([]);
    setCurrentIndex(0);
    setSessionId(null);
    toast.info('Đã đặt lại cấu hình mặc định');
  }, []);

  return (
    <div className="flex w-full flex-col pb-16">
      <PracticeHeader />

      <RecommendationBanner
        onStart15mPractice={() => {
          setMode('weakness');
          toast.info('Đã chọn chế độ điểm yếu');
        }}
        onSelectWeakness={(idx) => {
          toast.info(`Đã chọn phân vùng điểm yếu #${idx}`);
        }}
      />

      <PracticeSetupPanel
        level={level}
        onLevelChange={setLevel}
        section={section}
        onSectionChange={setSection}
        mode={mode}
        onModeChange={setMode}
        questionCount={questionCount}
        onQuestionCountChange={setQuestionCount}
        onResetConfig={handleResetConfig}
        onRefreshQuestions={handleRefreshQuestions}
      />

      {questions.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-on-surface-variant text-sm">
              Đang làm: Câu {currentIndex + 1}/{questions.length} · Session:{' '}
              {sessionId?.slice(0, 8) || 'Chưa tạo'}
            </p>
            <button
              type="button"
              onClick={handleStartPractice}
              disabled={!!sessionId}
              className="bg-primary text-on-primary rounded-lg px-4 py-2 text-xs font-semibold disabled:opacity-50"
            >
              {sessionId ? 'Đã bắt đầu' : 'Bắt đầu thực hành'}
            </button>
          </div>

          <QuestionInterface
            questions={questions}
            currentIndex={currentIndex}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            onComplete={handleCompletePractice}
            sessionId={sessionId}
          />
        </>
      ) : (
        <div className="text-on-surface-variant flex flex-col items-center justify-center py-20">
          <p className="text-lg font-semibold dark:text-white">
            Chọn cấu hình và tải câu hỏi
          </p>
          <p className="text-sm">Nhấn "Làm mới bộ câu hỏi" để bắt đầu</p>
        </div>
      )}
    </div>
  );
}
