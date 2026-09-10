import { Bookmark, Flag, Languages, Timer } from 'lucide-react';
import { useState } from 'react';

import { Badge, Button, Card } from '@/components/ui';

interface QuestionInterfaceProps {
  currentQuestion: number;
  totalQuestions: number;
  onSelectQuestion: (num: number) => void;
  answersState: Record<number, { isCorrect: boolean; selected: string }>;
  selectedOption: string | null;
  onSelectOption: (optionKey: string) => void;
  showExplanation: boolean;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
}

export function QuestionInterface({
  currentQuestion,
  totalQuestions,
  onSelectQuestion,
  answersState,
  selectedOption,
  onSelectOption,
  showExplanation,
  onNextQuestion,
  onPrevQuestion,
}: QuestionInterfaceProps) {
  const [showFurigana, setShowFurigana] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState<'md' | 'lg'>('md');

  const options = [
    {
      key: 'A',
      jp: '相手の気持ちを推し量ることさえできれば、言葉の選び方は重要ではない。',
      vn: 'Chỉ cần đoán được cảm xúc của đối phương thì cách chọn từ ngữ không quan trọng.',
      isCorrect: false,
    },
    {
      key: 'B',
      jp: '正確な言葉を選ぶこと自体が、相手への敬意と円滑な対話の基盤となる。',
      vn: 'Việc tự mình chọn lựa câu từ chính xác chính là nền tảng cho sự tôn trọng đối phương và đối thoại suôn sẻ.',
      isCorrect: true,
    },
    {
      key: 'C',
      jp: '現代社会では直接的な表現よりも、曖昧な表現のほうが好まれる。',
      vn: 'Trong xã hội hiện đại, biểu hiện mơ hồ được ưa chuộng hơn cách diễn đạt trực tiếp.',
      isCorrect: false,
    },
    {
      key: 'D',
      jp: '文脈を重視しすぎると、言葉本来の意味が失われてしまう。',
      vn: 'Nếu quá coi trọng ngữ cảnh, ý nghĩa vốn có của từ ngữ sẽ bị mất đi.',
      isCorrect: false,
    },
  ];

  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-6 rounded-2xl border-slate-100 p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      {/* Question Header & Top Meta Bar */}
      <div className="bg-surface-container-low/40 flex flex-col gap-3 rounded-xl p-4 pb-3 dark:bg-slate-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-on-primary rounded-full border-none px-2.5 py-0.5 text-xs font-bold">
              N2
            </Badge>
            <span className="text-on-surface font-semibold dark:text-white">
              Đọc hiểu ý kiến tác giả (Author&apos;s Opinion)
            </span>
            <span className="text-outline">·</span>
            <span className="text-secondary font-bold dark:text-emerald-400">
              Câu hỏi {currentQuestion} / {totalQuestions}
            </span>
          </div>

          {/* Utility Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Timer Pill */}
            <div className="bg-surface-container text-on-surface flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs dark:bg-slate-800 dark:text-slate-200">
              <Timer className="text-on-surface-variant size-3.5" />
              <span className="font-mono font-semibold">02:45 / 03:00</span>
            </div>

            {/* Font Size Switcher */}
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

            {/* Furigana Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFurigana(!showFurigana)}
              className="bg-surface-container text-on-surface hover:bg-surface-variant flex h-7 items-center gap-1 rounded-lg px-2.5 text-xs dark:bg-slate-800 dark:text-slate-200"
            >
              <Languages className="size-3.5" />
              <span>Furigana: {showFurigana ? 'BẬT' : 'TẮT'}</span>
            </Button>

            {/* Bookmark */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="hover:bg-surface-container text-on-surface-variant hover:text-primary size-7 rounded-lg p-0"
              title="Lưu câu hỏi"
            >
              <Bookmark
                className={`size-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
              />
            </Button>

            {/* Report */}
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-surface-container text-on-surface-variant hover:text-error size-7 rounded-lg p-0"
              title="Báo lỗi câu hỏi"
            >
              <Flag className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="bg-surface-container-high h-1.5 w-full overflow-hidden rounded-full dark:bg-slate-800">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Navigator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-xs">
          <span className="text-on-surface-variant mr-1 shrink-0 text-[11px] font-semibold">
            Chuyển nhanh:
          </span>
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
            (num) => {
              const state = answersState[num];
              const isCurrent = currentQuestion === num;

              let pillStyle =
                'bg-surface-container text-on-surface-variant hover:bg-surface-variant dark:bg-slate-800';
              if (isCurrent) {
                pillStyle = 'bg-primary text-on-primary font-bold shadow-2xs';
              } else if (state?.isCorrect) {
                pillStyle = 'bg-secondary text-on-secondary font-bold';
              } else if (state?.isCorrect === false) {
                pillStyle = 'bg-error text-on-error font-bold';
              }

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onSelectQuestion(num)}
                  className={`flex size-7 items-center justify-center rounded-lg text-xs transition-all ${pillStyle}`}
                >
                  {num}
                </button>
              );
            },
          )}

          <div className="text-on-surface-variant ml-auto flex shrink-0 items-center gap-3 pl-2 text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <span className="bg-secondary size-2 rounded-full" /> Đúng
            </span>
            <span className="flex items-center gap-1">
              <span className="bg-error size-2 rounded-full" /> Sai
            </span>
            <span className="flex items-center gap-1">
              <span className="bg-primary size-2 rounded-full" /> Đang làm
            </span>
          </div>
        </div>
      </div>

      {/* Reading Passage Box */}
      <div className="bg-surface-container-low flex flex-col gap-4 rounded-xl p-5 sm:p-6 dark:bg-slate-800/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
            ĐOẠN VĂN ĐỌC HIỂU (PASSAGE #204)
          </span>
          <span className="bg-surface-container text-on-surface rounded px-2 py-0.5 text-[11px] font-medium dark:bg-slate-700 dark:text-slate-200">
            Độ dài: 248 chữ
          </span>
        </div>

        <div
          className={`text-on-surface space-y-3 leading-loose tracking-wide select-text dark:text-white ${
            fontSize === 'lg' ? 'text-lg sm:text-xl' : 'text-base'
          }`}
        >
          <p>
            現代のコミュニケーションにおいて、言葉そのものの正確さよりも、相手の文脈や感情を
            {showFurigana ? (
              <ruby>
                推<rt className="text-[10px]">お</rt>
              </ruby>
            ) : (
              '推'
            )}
            し
            {showFurigana ? (
              <ruby>
                量<rt className="text-[10px]">はか</rt>
              </ruby>
            ) : (
              '量'
            )}
            る能力が重視される傾向がある。
          </p>

          <p>
            しかし、だからといって言葉の選び方を軽視してよいというわけではない。
            <span className="bg-secondary-fixed/40 text-primary rounded px-1 py-0.5 font-semibold dark:text-emerald-300">
              むしろ、言葉を慎重に選ぶことこそが、相手への
              {showFurigana ? (
                <ruby>
                  敬意<rt className="text-[10px]">けいい</rt>
                </ruby>
              ) : (
                '敬意'
              )}
              を示す第一歩なのである。
            </span>
          </p>

          <p>
            適切な語彙を選択する努力を怠れば、いかに豊かな共感力を持っていたとしても、真の意図が歪んで伝わってしまう危険性を常に孕んでいる。
          </p>
        </div>

        {/* Question Prompt */}
        <div className="bg-surface-container-lowest flex items-start gap-3 rounded-xl border border-slate-100 p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <Badge className="bg-primary text-on-primary shrink-0 rounded border-none px-2.5 py-1 text-xs font-bold">
            問 {currentQuestion}
          </Badge>
          <div className="space-y-0.5">
            <h4 className="font-heading text-primary text-sm font-bold sm:text-base dark:text-white">
              筆者が最も言いたいことはどれか。
            </h4>
            <p className="text-on-surface-variant text-xs">
              (Điều mà tác giả muốn truyền đạt nhất là điều nào sau đây?)
            </p>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex flex-col gap-2.5">
        <span className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
          CHỌN ĐÁP ÁN ĐÚNG NHẤT:
        </span>

        {options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          let cardStyle =
            'bg-surface-container-low/50 hover:bg-surface-container border-slate-100 dark:border-slate-800 dark:bg-slate-800/40';

          if (isSelected) {
            cardStyle =
              'bg-secondary-container/30 border-secondary/40 shadow-xs dark:bg-emerald-950/40';
          }

          return (
            <div
              key={opt.key}
              onClick={() => onSelectOption(opt.key)}
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${cardStyle}`}
            >
              <div
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isSelected
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container text-on-surface-variant dark:bg-slate-700'
                }`}
              >
                {opt.key}
              </div>

              <div className="flex flex-1 flex-col space-y-0.5">
                <span
                  className={`text-sm leading-snug sm:text-base ${
                    isSelected
                      ? 'text-primary font-bold dark:text-white'
                      : 'text-on-surface dark:text-slate-200'
                  }`}
                >
                  {opt.jp}
                </span>
                <span className="text-on-surface-variant text-xs leading-relaxed">
                  {opt.vn}
                </span>
              </div>

              <div className="mt-0.5 shrink-0">
                {isSelected ? (
                  <Badge className="bg-secondary text-on-secondary border-none px-2 py-0 text-[10px] font-bold">
                    Đã chọn
                  </Badge>
                ) : (
                  <div className="border-outline-variant size-4.5 rounded-full border" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Immediate Smart Feedback & Explanation Card */}
      {showExplanation && (
        <div className="bg-surface-container-low border-secondary/20 flex flex-col gap-4 rounded-xl border p-5 sm:p-6 dark:bg-slate-800/40">
          {/* Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/50 pb-2 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="bg-secondary text-on-secondary flex size-6 items-center justify-center rounded-full text-xs font-bold">
                ✓
              </div>
              <span className="font-heading text-secondary text-base font-bold dark:text-emerald-400">
                Chính xác! (Correct Answer: B)
              </span>
              <Badge className="bg-secondary-fixed text-on-secondary-fixed border-none px-2 py-0 text-[10px] font-bold">
                +12 Điểm Thích ứng
              </Badge>
            </div>
            <span className="text-on-surface-variant text-xs">
              Thời gian làm câu này: 42 giây
            </span>
          </div>

          {/* Analysis & Key Clue */}
          <div className="bg-surface-container-lowest flex flex-col gap-2 rounded-xl border border-slate-100 p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="text-primary flex items-center gap-1.5 text-xs font-bold dark:text-white">
              <span className="text-secondary text-sm">💡</span>
              Tại sao đúng? (Explanation & Logic):
            </div>
            <p className="text-on-surface text-xs leading-relaxed sm:text-sm dark:text-slate-200">
              Từ khoá then chốt{' '}
              <code className="bg-surface-container text-primary rounded px-1 py-0.5 text-xs font-bold dark:bg-slate-800 dark:text-white">
                「〜というわけではない」
              </code>{' '}
              (không hẳn là/không có nghĩa là) kết hợp với{' '}
              <code className="bg-surface-container text-primary rounded px-1 py-0.5 text-xs font-bold dark:bg-slate-800 dark:text-white">
                「むしろ、〜こそが」
              </code>{' '}
              (trái lại/thay vào đó, chính...) ở câu kết thể hiện rõ tác giả
              muốn khẳng định:{' '}
              <strong className="text-primary dark:text-white">
                Việc lựa chọn từ ngữ cẩn trọng chính là bước đầu thể hiện sự tôn
                trọng đối phương.
              </strong>
            </p>

            <div className="bg-surface-container-low text-on-surface mt-1 flex items-start gap-2 rounded-lg p-3 text-xs dark:bg-slate-800/60 dark:text-slate-200">
              <span className="text-primary font-bold dark:text-indigo-400">
                ⚡ Mẹo thi JLPT N2:
              </span>
              <span>
                Cấu trúc <em>A というわけではない。むしろ B こそ...</em> thường
                dẫn trực tiếp đến thông điệp và lập trường tác giả muốn nhấn
                mạnh trong phần Dokkai!
              </span>
            </div>
          </div>

          {/* Related Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-on-surface-variant font-medium">
              Kiến thức liên quan:
            </span>
            <Badge className="bg-surface-container-lowest text-primary hover:bg-surface-container cursor-pointer border border-slate-200 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              Ngữ pháp N2: 〜というわけではない
            </Badge>
            <Badge className="bg-surface-container-lowest text-primary hover:bg-surface-container cursor-pointer border border-slate-200 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              Từ vựng: 敬意 (けいい - Kính ý)
            </Badge>
            <Badge className="bg-surface-container-lowest text-primary hover:bg-surface-container cursor-pointer border border-slate-200 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              Từ vựng: 推し量る (おしはかる)
            </Badge>
          </div>
        </div>
      )}

      {/* Bottom Control Footer */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-2 sm:flex-row dark:border-slate-800">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevQuestion}
          disabled={currentQuestion <= 1}
          className="bg-surface-container hover:bg-surface-variant text-on-surface h-9 w-full rounded-xl border-none px-4 text-xs font-semibold sm:w-auto dark:bg-slate-800 dark:text-slate-200"
        >
          ← Câu trước (Câu {Math.max(1, currentQuestion - 1)})
        </Button>

        <div className="text-on-surface-variant text-center text-xs">
          Đã trả lời đúng{' '}
          <strong className="text-primary dark:text-white">3/4</strong> câu · Dự
          kiến hoàn thành để mở khóa Bảng phân tích kết quả.
        </div>

        <Button
          size="sm"
          onClick={onNextQuestion}
          className="bg-primary hover:bg-primary-container text-on-primary h-9 w-full rounded-xl px-6 text-xs font-bold shadow-xs sm:w-auto"
        >
          <span>
            Câu tiếp theo (Câu {Math.min(totalQuestions, currentQuestion + 1)}/
            {totalQuestions}) →
          </span>
        </Button>
      </div>
    </Card>
  );
}
