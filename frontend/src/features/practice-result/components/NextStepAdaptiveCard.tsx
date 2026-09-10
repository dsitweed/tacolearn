import { RotateCcw, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button, Card } from '@/components/ui';

interface NextStepAdaptiveProps {
  onPracticeTargeted: () => void;
  onRedoWrongAnswers: () => void;
}

export function NextStepAdaptiveCard({
  onPracticeTargeted,
  onRedoWrongAnswers,
}: NextStepAdaptiveProps) {
  return (
    <Card className="bg-primary text-on-primary relative flex flex-col justify-between overflow-hidden rounded-2xl border-none p-6 shadow-xl">
      {/* Background Accent Glow */}
      <div className="bg-secondary/30 pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full blur-2xl" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <Badge className="bg-secondary-fixed/20 text-secondary-fixed flex items-center gap-1 border-none text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="size-3" /> Taco Adaptive
          </Badge>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">
            Đề xuất tối ưu
          </span>
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold text-white">
            Bước đi tiếp theo dành cho bạn
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            Bởi vì độ chính xác của bạn ở dạng bài{' '}
            <strong className="font-semibold text-white">
              &quot;Quan điểm tác giả&quot;
            </strong>{' '}
            hiện đang ở mức 48%:
          </p>
        </div>

        {/* Targeted Practice Box */}
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-md">
          <div className="text-secondary-fixed flex items-center gap-2 text-xs font-bold">
            <Zap className="size-4 fill-current" />
            <span>Luyện nhanh: Đọc hiểu quan điểm tác giả</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/90">
            <span>5 câu trọng điểm</span>
            <span>•</span>
            <span>Ước tính ~8 phút</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="relative z-10 mt-5 flex flex-col gap-2">
        <Button
          onClick={onPracticeTargeted}
          className="bg-secondary text-on-secondary flex h-10 w-full items-center justify-center gap-2 rounded-xl border-none text-xs font-bold shadow-md transition-all hover:opacity-90"
        >
          <span>Luyện tập ngay bây giờ</span>
          <Zap className="size-3.5 fill-current" />
        </Button>

        <Button
          variant="ghost"
          asChild
          className="h-9 w-full rounded-xl border-none bg-white/10 text-xs font-semibold text-white hover:bg-white/20"
        >
          <Link href="/dashboard">Quay lại Trang tổng quan (Dashboard)</Link>
        </Button>

        <Button
          variant="ghost"
          onClick={onRedoWrongAnswers}
          className="flex h-7 items-center justify-center gap-1 p-0 text-xs font-medium text-white/70 hover:text-white"
        >
          <RotateCcw className="size-3" />
          <span>Làm lại bộ đề này với 3 câu đã sai</span>
        </Button>
      </div>
    </Card>
  );
}
