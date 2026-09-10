import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';

import { Badge, Button } from '@/components/ui';

interface CatchUpHeaderBannerProps {
  completedTasks: number;
  totalTasks: number;
  onStartClick: () => void;
}

export function CatchUpHeaderBanner({
  completedTasks,
  totalTasks,
  onStartClick,
}: CatchUpHeaderBannerProps) {
  return (
    <div className="bg-surface-container-low relative w-full overflow-hidden rounded-2xl border border-slate-100 p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      {/* Decorative Halo Blurs */}
      <div className="bg-secondary-fixed/20 pointer-events-none absolute -top-20 -right-20 size-80 rounded-full blur-3xl" />
      <div className="bg-surface-container-highest/60 pointer-events-none absolute -bottom-12 -left-12 size-64 rounded-full blur-2xl" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Session Missed Pill & Auto Pipeline Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="bg-tertiary-fixed text-on-tertiary-fixed inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold">
            <AlertTriangle className="text-on-tertiary-container size-4 fill-current" />
            <span>
              Buổi học đã nghỉ: Ngày 10/09 • 14:00 - 15:30 (Phòng N3-A)
            </span>
          </div>

          <div className="text-on-surface-variant flex items-center gap-1.5 font-medium">
            <ShieldCheck className="text-secondary size-4" />
            <span>Taco AI Synced Pipeline • Phiên bản tóm tắt tự động</span>
          </div>
        </div>

        {/* Main Headline & Information */}
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div className="flex max-w-3xl flex-col space-y-2">
            <div className="text-on-surface-variant flex items-center gap-2 text-xs">
              <span>
                Giảng viên:{' '}
                <strong className="text-on-surface">
                  Tanaka Kenji (田中 健司)
                </strong>
              </span>
              <span>•</span>
              <Badge className="bg-surface-container text-primary hover:bg-surface-container rounded border-none px-2 py-0.5 text-[11px] font-bold dark:bg-slate-800 dark:text-slate-200">
                JLPT N3-A
              </Badge>
            </div>

            <h1 className="font-heading text-primary text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              Lộ trình Học bù cấp tốc: N3 Grammar & Practical Patterns
            </h1>

            <p className="text-on-surface-variant text-sm leading-relaxed">
              Đừng lo lắng về việc hổng kiến thức! Taco Learn đã tự động phân
              tích video bài giảng và trích xuất thành lộ trình học bù cô đọng{' '}
              <strong className="text-on-surface dark:text-white">
                24 phút
              </strong>
              . Hoàn thành 4 chặng để hoàn tác điểm danh vắng mặt.
            </p>
          </div>

          {/* Primary CTA Trigger */}
          <div className="shrink-0">
            <Button
              size="lg"
              onClick={onStartClick}
              className="bg-primary hover:bg-primary-container text-on-primary inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-xs font-semibold shadow-xs transition-transform active:scale-95 sm:text-sm"
            >
              <PlayCircle className="size-5" />
              <span>Bắt đầu chu trình Học bù ngay</span>
            </Button>
          </div>
        </div>

        {/* Live Metric Chips Strip */}
        <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
          <div className="bg-surface-container-lowest flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/80">
            <div className="bg-surface-container text-primary flex size-10 shrink-0 items-center justify-center rounded-lg dark:bg-slate-800 dark:text-slate-200">
              <Clock className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[11px] font-medium">
                Thời gian ước tính
              </span>
              <span className="font-heading text-primary text-base font-bold dark:text-white">
                24 phút{' '}
                <span className="text-on-surface-variant text-xs font-normal">
                  cô đọng
                </span>
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/80">
            <div className="bg-secondary-fixed/40 text-secondary flex size-10 shrink-0 items-center justify-center rounded-lg dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[11px] font-medium">
                Tiến độ phục hồi
              </span>
              <span className="font-heading text-primary text-base font-bold dark:text-white">
                {completedTasks} / {totalTasks}{' '}
                <span className="text-on-surface-variant text-xs font-normal">
                  nhiệm vụ
                </span>
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/80">
            <div className="bg-tertiary-fixed text-on-tertiary-container flex size-10 shrink-0 items-center justify-center rounded-lg dark:bg-amber-950 dark:text-amber-300">
              <AlertTriangle className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[11px] font-medium">
                Trạng thái chuyên cần
              </span>
              <span className="font-heading text-on-surface flex items-center gap-1.5 text-base font-bold dark:text-white">
                92.0%
                <Badge className="bg-error-container text-on-error-container border-none px-1.5 py-0 text-[10px] font-bold">
                  Vắng 1 buổi
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
