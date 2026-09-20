import { Bookmark, Clock, Flag, Languages } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Badge, Button, Card } from '@/components/ui';
import type { Question } from '@/features/practice/hooks/useQuestions';
import { useSubmitAnswer } from '@/features/practice/hooks/useQuestions';

interface QuestionInterfaceProps {
  questions: Question[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  sessionId: string | null;
}

interface AnswerState {
  selectedAnswer: string;
  isCorrect: boolean | null;
  timeSpent: number;
  showExplanation: boolean;
}

export function QuestionInterface({
  questions,
  currentIndex,
  onNext,
  onPrev,
  onComplete,
  sessionId,
}: QuestionInterfaceProps) {
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [showFurigana, setShowFurigana] = useState(true);
  const [fontSize, setFontSize] = useState<'md' | 'lg'>('md');
  const [questionStartTime] = useState(Date.now());

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100,
  );

  const submitAnswerMutation = useSubmitAnswer();

  if (!question) return null;

  const choices = Array.isArray(question.choices)
    ? question.choices.filter((choice) => choice && choice.code && choice.text)
    : [];
  const correctAnswerCode = question.correctAnswerCode || '';
  const answer = answers[currentIndex];
  const isAnswered =
    answer?.isCorrect !== null && answer?.isCorrect !== undefined;
  const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

  const handleSelectOption = useCallback(
    (optionKey: string) => {
      if (answer?.selectedAnswer) return;

      const isCorrect = optionKey === correctAnswerCode;
      const timeSpentSeconds = Math.round(
        (Date.now() - questionStartTime) / 1000,
      );

      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          selectedAnswer: optionKey,
          isCorrect,
          timeSpent: timeSpentSeconds,
          showExplanation: true,
        },
      }));

      if (sessionId) {
        submitAnswerMutation.mutate({
          sessionId,
          questionId: question.id,
          answerCode: optionKey,
          timeSpentSeconds,
        });
      }
    },
    [
      currentIndex,
      correctAnswerCode,
      question.id,
      sessionId,
      questionStartTime,
      answer?.selectedAnswer,
    ],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      onNext();
    } else {
      onComplete();
    }
  }, [currentIndex, totalQuestions, onNext, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onPrev();
    }
  }, [currentIndex, onPrev]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const elapsedTime = Math.round((Date.now() - questionStartTime) / 1000);

  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-6 rounded-2xl border-slate-100 p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      {/* Question Header */}
      <div className="bg-surface-container-low/40 flex flex-col gap-3 rounded-xl p-4 pb-3 dark:bg-slate-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-on-primary rounded-full border-none px-2.5 py-0.5 text-xs font-bold">
              {question.jlptLevel}
            </Badge>
            <span className="text-on-surface font-semibold dark:text-white">
              {question.section === 'VOCABULARY'
                ? 'Từ vựng'
                : question.section === 'GRAMMAR'
                  ? 'Ngữ pháp'
                  : question.section === 'READING'
                    ? 'Đọc hiểu'
                    : 'Nghe hiểu'}
            </span>
            <span className="text-outline">·</span>
            <span className="text-secondary font-bold dark:text-emerald-400">
              Câu hỏi {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-surface-container text-on-surface flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs dark:bg-slate-800 dark:text-slate-200">
              <Clock className="text-on-surface-variant size-3.5" />
              <span className="font-mono font-semibold">
                {formatTime(elapsedTime)}
              </span>
            </div>

            <div className="bg-surface-container text-on-surface-variant flex items-center rounded-lg px-1.5 py-0.5 text-xs font-bold dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setFontSize('md')}
                className={`hover:text-primary p-1 ${fontSize === 'md' ? 'text-primary dark:text-white' : ''}`}
              >
                A-
              </button>
              <span className="text-outline-variant px-1 text-[10px]">|</span>
              <button
                type="button"
                onClick={() => setFontSize('lg')}
                className={`hover:text-primary p-1 ${fontSize === 'lg' ? 'text-primary dark:text-white' : ''}`}
              >
                A+
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFurigana(!showFurigana)}
              className="bg-surface-container text-on-surface hover:bg-surface-variant flex h-7 items-center gap-1 rounded-lg px-2.5 text-xs dark:bg-slate-800 dark:text-slate-200"
            >
              <Languages className="size-3.5" />
              <span>Furigana: {showFurigana ? 'BẬT' : 'TẮT'}</span>
            </Button>
          </div>
        </div>

        <div className="bg-surface-container-high h-1.5 w-full overflow-hidden rounded-full dark:bg-slate-800">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-surface-container-low flex flex-col gap-4 rounded-xl p-5 sm:p-6 dark:bg-slate-800/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
            CÂU HỎI #{currentIndex + 1}
          </span>
          <span className="bg-surface-container text-on-surface rounded px-2 py-0.5 text-[11px] font-medium dark:bg-slate-700 dark:text-slate-200">
            {question.difficulty}
          </span>
        </div>

        <div
          className={`text-on-surface space-y-3 leading-loose tracking-wide select-text dark:text-white ${
            fontSize === 'lg' ? 'text-lg sm:text-xl' : 'text-base'
          }`}
          dangerouslySetInnerHTML={{ __html: question.content }}
        />
      </div>

      {/* Answer Options */}
      <div className="flex flex-col gap-2.5">
        <span className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
          CHỌN ĐÁP ÁN ĐÚNG NHẤT:
        </span>

        {choices.length === 0 ? (
          <div className="bg-surface-container-low/50 rounded-xl border border-slate-100 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-on-surface-variant text-center dark:text-slate-300">
              Không có lựa chọn nào cho câu hỏi này.
            </p>
          </div>
        ) : (
          choices.map((opt) => {
            const isSelected = answer?.selectedAnswer === opt.code;
            const isCorrect = opt.code === correctAnswerCode && isAnswered;
            const isWrong =
              answer?.selectedAnswer === opt.code && !answer.isCorrect;

            let cardStyle =
              'bg-surface-container-low/50 hover:bg-surface-container border-slate-100 dark:border-slate-800 dark:bg-slate-800/40';
            if (isSelected && isCorrect)
              cardStyle = 'bg-emerald-950/40 border-emerald-500/40 shadow-xs';
            else if (isSelected && !isCorrect)
              cardStyle = 'bg-red-950/40 border-red-500/40 shadow-xs';
            else if (isCorrect && isAnswered && !isSelected)
              cardStyle = 'bg-emerald-950/20 border-emerald-500/20';

            return (
              <div
                key={opt.code}
                onClick={() => handleSelectOption(opt.code)}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${cardStyle}`}
              >
                <div
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant dark:bg-slate-700'
                  }`}
                >
                  {opt.code}
                </div>

                <div className="flex flex-1 flex-col space-y-0.5">
                  <span
                    className={`text-sm leading-snug sm:text-base ${isSelected ? 'text-primary font-bold dark:text-white' : 'text-on-surface dark:text-slate-200'}`}
                  >
                    {opt.text}
                  </span>
                </div>

                <div className="mt-0.5 shrink-0">
                  {isSelected && (
                    <Badge
                      className={`border-none px-2 py-0 text-[10px] font-bold ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {isCorrect ? 'Đúng' : 'Sai'}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Explanation */}
      {answer?.showExplanation && (
        <div className="bg-surface-container-low border-secondary/20 flex flex-col gap-4 rounded-xl border p-5 sm:p-6 dark:bg-slate-800/40">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/50 pb-2 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div
                className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${answer.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {answer.isCorrect ? '✓' : '✗'}
              </div>
              <span
                className={`font-heading text-base font-bold ${answer.isCorrect ? 'text-emerald-400 dark:text-emerald-400' : 'text-red-400'}`}
              >
                {answer.isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}
              </span>
            </div>
            <span className="text-on-surface-variant text-xs">
              Thời gian: {formatTime(answer.timeSpent)} giây
            </span>
          </div>

          <div className="bg-surface-container-lowest flex flex-col gap-2 rounded-xl border border-slate-100 p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="text-primary flex items-center gap-1.5 text-xs font-bold dark:text-white">
              <span>💡</span>
              Giải thích:
            </div>
            <p className="text-on-surface text-xs leading-relaxed sm:text-sm dark:text-slate-200">
              {question.explanation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-on-surface-variant font-medium">
              Kiến thức liên quan:
            </span>
            {question.tags.map((tag, i) => (
              <Badge
                key={i}
                className="bg-surface-container-lowest text-primary hover:bg-surface-container cursor-pointer border border-slate-200 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Control Footer */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-2 sm:flex-row dark:border-slate-800">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="bg-surface-container hover:bg-surface-variant text-on-surface h-9 w-full rounded-xl border-none px-4 text-xs font-semibold sm:w-auto dark:bg-slate-800 dark:text-slate-200"
        >
          ← Câu trước (Câu {Math.max(1, currentIndex)})
        </Button>

        <div className="text-on-surface-variant text-center text-xs">
          Đã trả lời đúng{' '}
          <strong className="text-primary dark:text-white">
            {Object.values(answers).filter((a) => a.isCorrect).length}
          </strong>{' '}
          / {totalQuestions} câu
        </div>

        <Button
          size="sm"
          onClick={handleNext}
          disabled={!answer?.selectedAnswer}
          className="bg-primary hover:bg-primary-container text-on-primary h-9 w-full rounded-xl px-6 text-xs font-bold shadow-xs disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <span>
            {currentIndex < totalQuestions - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}{' '}
            ({Math.min(totalQuestions, currentIndex + 2)}/{totalQuestions}) →
          </span>
        </Button>
      </div>
    </Card>
  );
}
