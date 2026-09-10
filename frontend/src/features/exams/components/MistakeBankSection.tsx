import { History, RefreshCcwDot } from 'lucide-react';

import { Badge, Button, Card } from '@/components/ui';

interface MistakeBankSectionProps {
  onPracticeMistakes: () => void;
}

export function MistakeBankSection({
  onPracticeMistakes,
}: MistakeBankSectionProps) {
  return (
    <Card className="bg-surface-container-lowest flex flex-col items-start justify-between gap-6 rounded-2xl border-slate-100 p-6 shadow-xs sm:p-7 lg:flex-row lg:items-center dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="bg-tertiary-fixed text-on-tertiary-fixed flex size-12 shrink-0 items-center justify-center rounded-xl shadow-2xs dark:bg-amber-950 dark:text-amber-300">
          <RefreshCcwDot className="size-6" />
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-primary text-base font-bold sm:text-lg dark:text-white">
              Kho 42 Câu Hỏi Sai Cần Phục Thù (Mistake Bank)
            </h3>
            <Badge className="bg-error/10 text-error border-none px-2 py-0 text-[10px] font-semibold dark:bg-red-950 dark:text-red-300">
              Cần master
            </Badge>
          </div>

          <p className="text-on-surface-variant max-w-xl text-xs leading-relaxed">
            Tổng hợp tự động tất cả các câu bạn từng làm sai ở các đề thi trước.
            Thuật toán Spaced Repetition (SRS) nhắc bạn làm lại đúng chu kỳ quên
            để khắc cốt ghi tâm.
          </p>

          <div className="text-on-surface flex flex-wrap items-center gap-4 pt-1 text-xs dark:text-slate-200">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="bg-error size-2 rounded-full" /> 18 Từ vựng/Kanji
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="bg-on-tertiary-container size-2 rounded-full" />{' '}
              14 Ngữ pháp
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="bg-secondary size-2 rounded-full" /> 10 Đoạn đọc
              ngắn
            </span>
          </div>
        </div>
      </div>

      <div className="w-full shrink-0 lg:w-auto">
        <Button
          onClick={onPracticeMistakes}
          className="bg-primary hover:bg-secondary text-on-primary flex h-10 w-full items-center justify-center gap-2 rounded-xl px-6 text-xs font-semibold shadow-xs transition-all lg:w-auto"
        >
          <History className="size-4" />
          <span>Làm lại các câu sai (42 câu)</span>
        </Button>
      </div>
    </Card>
  );
}
