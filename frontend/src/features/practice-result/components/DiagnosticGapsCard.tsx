import { Brain, PlayCircle } from 'lucide-react';

import { Badge, Button, Card, Progress } from '@/components/ui';

interface DiagnosticGapsCardProps {
  onFixWeakSkills: () => void;
}

export function DiagnosticGapsCard({
  onFixWeakSkills,
}: DiagnosticGapsCardProps) {
  return (
    <Card className="bg-surface-container-lowest rounded-2xl border-slate-100 p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="bg-tertiary-fixed text-on-tertiary-fixed flex size-10 shrink-0 items-center justify-center rounded-xl dark:bg-amber-950 dark:text-amber-300">
          <Brain className="size-5" />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-error text-[11px] font-bold tracking-wider uppercase">
                CHẨN ĐOÁN THÔNG MINH TỪ TACO AI
              </span>
              <h3 className="font-heading text-primary mt-0.5 text-lg font-bold dark:text-white">
                Phát hiện 2 lỗ hổng tư duy cần khắc phục
              </h3>
            </div>

            <Badge className="bg-error-container text-on-error-container rounded-full border-none px-3 py-1 text-xs font-semibold">
              Mức độ ưu tiên cao
            </Badge>
          </div>

          {/* Diagnostic Bars */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-surface-container-low rounded-xl border border-slate-100 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-on-surface font-semibold dark:text-white">
                  Đọc hiểu · Quan điểm tác giả
                </span>
                <span className="text-error font-bold">48%</span>
              </div>
              <Progress
                value={48}
                className="bg-surface-container-highest [&>div]:bg-error h-2"
              />
              <span className="text-on-surface-variant mt-1.5 block text-[11px]">
                2/4 câu sai ở dạng thức này
              </span>
            </div>

            <div className="bg-surface-container-low rounded-xl border border-slate-100 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-on-surface font-semibold dark:text-white">
                  Đọc hiểu · Suy luận ngữ cảnh
                </span>
                <span className="text-on-tertiary-container font-bold dark:text-amber-400">
                  52%
                </span>
              </div>
              <Progress
                value={52}
                className="bg-surface-container-highest [&>div]:bg-on-tertiary-container h-2"
              />
              <span className="text-on-surface-variant mt-1.5 block text-[11px]">
                1/2 câu sai liên quan suy luận nhân vật
              </span>
            </div>
          </div>

          {/* Pedagogical Insight Explanation */}
          <div className="bg-surface-container-low/70 text-on-surface flex items-start gap-2.5 rounded-xl border border-slate-100 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-200">
            <span className="text-primary mt-0.5 shrink-0 text-sm dark:text-indigo-400">
              💡
            </span>
            <p className="leading-relaxed">
              <strong className="text-primary font-semibold dark:text-white">
                Phân tích sư phạm:
              </strong>{' '}
              Bạn thường xuyên chọn nhầm phương án mang tính suy diễn chủ quan
              thay vì bám sát từ khóa phủ định kép và khẳng định nhấn mạnh của
              tác giả (điển hình như cấu trúc{' '}
              <code className="bg-surface-container text-primary rounded px-1.5 py-0.5 font-bold dark:bg-slate-700 dark:text-white">
                「〜というわけではない。むしろ〜」
              </code>
              ).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-on-surface-variant text-xs">
              Bài luyện bù tự động được tạo riêng theo lỗi sai của bạn
            </span>
            <Button
              size="sm"
              onClick={onFixWeakSkills}
              className="bg-primary text-on-primary hover:bg-primary-container flex h-9 items-center gap-1.5 rounded-xl px-4 text-xs font-semibold shadow-xs"
            >
              <PlayCircle className="size-4" />
              <span>Khắc phục 2 kỹ năng này (8 phút)</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
