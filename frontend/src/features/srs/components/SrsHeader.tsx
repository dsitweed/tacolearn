import {
  ChevronRight,
  Clock,
  Keyboard,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

interface SrsHeaderProps {
  currentCard: number;
  totalCards: number;
  accuracy: number;
  estimatedMinutes: number;
}

export function SrsHeader({
  currentCard,
  totalCards,
  accuracy,
  estimatedMinutes,
}: SrsHeaderProps) {
  const progressPercent = Math.round((currentCard / totalCards) * 100);

  return (
    <div className="mb-6 flex flex-col gap-3 pt-2">
      {/* Breadcrumb & Live Classroom Sync Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="text-on-surface-variant flex flex-wrap items-center gap-1.5 font-medium">
          <Link
            href="/dashboard"
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Khóa học N3 Tổng hợp
          </Link>
          <ChevronRight className="text-outline size-3.5" />
          <span className="hover:text-primary cursor-pointer transition-colors">
            Lesson 18
          </span>
          <ChevronRight className="text-outline size-3.5" />
          <span className="bg-surface-container text-primary rounded-full px-2.5 py-0.5 font-semibold">
            Phiên ôn tập SRS hàng ngày
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-secondary flex items-center gap-1.5 text-xs font-semibold">
            <span className="bg-secondary size-2 animate-pulse rounded-full" />
            <span>Đang đồng bộ Classroom N3-A</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-on-surface-variant hover:bg-surface-container hover:text-on-surface size-8 rounded-lg p-0"
            title="Cài đặt phiên học"
          >
            <SlidersHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      {/* Main Title & Progress Header Row */}
      <div className="mt-1 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-primary text-2xl font-bold tracking-tight lg:text-3xl">
              Spaced Repetition Review
            </h1>
            <Badge className="bg-secondary/15 text-secondary border-none text-[10px] font-semibold uppercase">
              SRS v2.4
            </Badge>
          </div>
          <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">
            Đồng bộ tự động từ buổi học của Tanaka Sensei • Lesson 18:
            ~わけではない
          </p>
        </div>

        {/* Quick Metrics Pill Group */}
        <div className="bg-surface-container-low flex flex-wrap items-center gap-2 rounded-xl p-1.5 shadow-2xs">
          <div className="bg-surface-container-lowest flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs shadow-xs">
            <RotateCcw className="text-primary size-3.5" />
            <span className="text-on-surface-variant">Tiến độ:</span>
            <span className="text-on-surface font-bold">
              Thẻ {currentCard} / {totalCards}
            </span>
          </div>

          <div className="bg-surface-container-lowest flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs shadow-xs">
            <Sparkles className="text-secondary size-3.5" />
            <span className="text-on-surface-variant">Độ chính xác:</span>
            <span className="text-secondary font-bold">{accuracy}%</span>
          </div>

          <div className="bg-surface-container-lowest flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs shadow-xs">
            <Clock className="size-3.5 text-amber-600" />
            <span className="text-on-surface-variant">Thời gian:</span>
            <span className="text-on-surface font-bold">
              ~{estimatedMinutes} phút
            </span>
          </div>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="bg-surface-container mt-1 h-1.5 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop Global Keyboard Shortcut Bar */}
      <div className="bg-surface-container-low text-on-surface-variant flex flex-wrap items-center justify-between gap-2 rounded-lg px-4 py-2 text-xs">
        <div className="flex items-center gap-1.5">
          <Keyboard className="text-outline size-4" />
          <span className="text-on-surface font-semibold">Phím tắt nhanh:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1">
            <kbd className="bg-surface-container-lowest text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold shadow-2xs">
              Space
            </kbd>{' '}
            Hiện / Ẩn Furigana
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-surface-container-lowest text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold shadow-2xs">
              R
            </kbd>{' '}
            Nghe phát âm
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-surface-container-lowest text-error rounded px-1.5 py-0.5 text-[10px] font-semibold shadow-2xs">
              1
            </kbd>{' '}
            Again
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-surface-container-lowest rounded px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 shadow-2xs">
              2
            </kbd>{' '}
            Hard
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-surface-container-lowest text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold shadow-2xs">
              3
            </kbd>{' '}
            Good
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-surface-container-lowest text-secondary rounded px-1.5 py-0.5 text-[10px] font-semibold shadow-2xs">
              4
            </kbd>{' '}
            Easy
          </span>
        </div>
      </div>
    </div>
  );
}
