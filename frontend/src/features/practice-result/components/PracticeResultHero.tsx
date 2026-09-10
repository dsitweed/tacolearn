import {
  CheckCircle2,
  ChevronRight,
  Printer,
  Share2,
  Timer,
} from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

interface PracticeResultHeroProps {
  score: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  timeSpent: string;
  avgTimePerQuestion: string;
  accuracy: number;
  onShare?: () => void;
  onExportPdf?: () => void;
}

export function PracticeResultHero({
  score,
  total,
  correctCount,
  wrongCount,
  timeSpent,
  avgTimePerQuestion,
  accuracy,
  onShare,
  onExportPdf,
}: PracticeResultHeroProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="text-on-surface-variant flex flex-wrap items-center gap-1.5 text-xs font-medium">
        <Link
          href="/dashboard"
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Luyện đề JLPT
        </Link>
        <ChevronRight className="text-outline size-3" />
        <Link
          href="/dashboard/exams"
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Kết quả luyện tập thích ứng
        </Link>
        <ChevronRight className="text-outline size-3" />
        <span className="text-primary font-semibold">
          N2 Đọc hiểu (Reading Comprehension)
        </span>
      </nav>

      {/* Header Info & Actions */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge className="bg-secondary-container/50 text-on-secondary-container mb-2 inline-flex items-center gap-1.5 rounded-full border-none px-3 py-1 text-xs font-semibold">
            <CheckCircle2 className="text-secondary fill-secondary size-4 text-white" />
            <span>Phiên làm bài hoàn tất ✓</span>
          </Badge>

          <h1 className="font-heading text-primary text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
            Kết quả luyện tập: JLPT N2 · Đọc hiểu
          </h1>

          <div className="text-on-surface-variant mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
            <span>{total} câu hỏi trắc nghiệm</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Timer className="size-3.5" />
              Thời gian: {timeSpent}
            </span>
            <span>•</span>
            <span>Hoàn thành: Hôm nay, 10:45</span>
            <span>•</span>
            <Badge className="bg-surface-container text-on-surface border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
              Bộ đề Thích ứng A-402
            </Badge>
          </div>
        </div>

        {/* Action Quick-Links */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="bg-surface-container-lowest hover:bg-surface-container text-on-surface flex h-9 items-center gap-1.5 border-slate-200 text-xs font-semibold shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <Share2 className="size-3.5" />
            <span>Chia sẻ</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onExportPdf}
            className="bg-surface-container-lowest hover:bg-surface-container text-on-surface flex h-9 items-center gap-1.5 border-slate-200 text-xs font-semibold shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <Printer className="size-3.5" />
            <span>Xuất PDF</span>
          </Button>
        </div>
      </div>

      {/* Master KPI Banner */}
      <div className="bg-surface-container-lowest relative grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-slate-100 p-6 shadow-xs sm:p-7 lg:grid-cols-12 dark:border-slate-800 dark:bg-slate-900">
        {/* Accent indicator bar */}
        <div className="bg-secondary absolute top-0 bottom-0 left-0 w-1.5" />

        {/* Left Main Score Module */}
        <div className="flex flex-col justify-between border-b border-slate-100 pr-0 pb-5 lg:col-span-4 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
                ĐIỂM SỐ TỔNG KẾT
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-heading text-primary text-4xl font-bold sm:text-5xl dark:text-white">
                  {score}
                </span>
                <span className="font-heading text-outline text-xl font-bold sm:text-2xl">
                  / {total} câu
                </span>
              </div>
            </div>

            {/* Donut Visual SVG */}
            <div className="relative flex size-16 shrink-0 items-center justify-center">
              <svg
                className="size-full -rotate-90 transform"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-surface-container dark:text-slate-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${percentage}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="text-primary absolute text-xs font-bold dark:text-white">
                {percentage}%
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-secondary-container/70 text-on-secondary-fixed-variant inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <span className="bg-secondary size-2 rounded-full" />
              <span>Đạt chuẩn tiến độ JLPT N2</span>
            </div>
            <p className="text-on-surface-variant mt-2 text-xs leading-relaxed">
              Mức điểm trên 60% ngưỡng đậu an toàn cho phần Đọc hiểu N2 kỳ thi
              tháng 7.
            </p>
          </div>
        </div>

        {/* Right 4 Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8">
          {/* Metric 1: Correct */}
          <div className="bg-surface-container-low flex flex-col justify-between rounded-xl p-4 dark:bg-slate-800/50">
            <div className="text-on-surface-variant flex items-center justify-between text-xs">
              <span className="font-semibold">Đúng</span>
              <span className="text-secondary font-bold">✓</span>
            </div>
            <div className="mt-3">
              <div className="font-heading text-primary text-2xl font-bold dark:text-white">
                {correctCount}{' '}
                <span className="text-on-surface-variant text-xs font-normal">
                  câu
                </span>
              </div>
              <span className="text-secondary text-[11px] font-semibold dark:text-emerald-400">
                +1 so với lần trước
              </span>
            </div>
          </div>

          {/* Metric 2: Wrong */}
          <div className="bg-surface-container-low flex flex-col justify-between rounded-xl p-4 dark:bg-slate-800/50">
            <div className="text-on-surface-variant flex items-center justify-between text-xs">
              <span className="font-semibold">Sai</span>
              <span className="text-error font-bold">✕</span>
            </div>
            <div className="mt-3">
              <div className="font-heading text-error text-2xl font-bold">
                {wrongCount}{' '}
                <span className="text-on-surface-variant text-xs font-normal">
                  câu
                </span>
              </div>
              <span className="text-error text-[11px] font-semibold">
                Đã phân loại lỗi
              </span>
            </div>
          </div>

          {/* Metric 3: Accuracy */}
          <div className="bg-surface-container-low flex flex-col justify-between rounded-xl p-4 dark:bg-slate-800/50">
            <div className="text-on-surface-variant flex items-center justify-between text-xs">
              <span className="font-semibold">Độ chính xác</span>
              <span className="text-primary font-bold dark:text-indigo-400">
                %
              </span>
            </div>
            <div className="mt-3">
              <div className="font-heading text-primary text-2xl font-bold dark:text-white">
                {accuracy}%
              </div>
              <span className="text-on-surface-variant text-[11px]">
                Mục tiêu: 65%
              </span>
            </div>
          </div>

          {/* Metric 4: Avg time */}
          <div className="bg-surface-container-low flex flex-col justify-between rounded-xl p-4 dark:bg-slate-800/50">
            <div className="text-on-surface-variant flex items-center justify-between text-xs">
              <span className="font-semibold">TB / câu</span>
              <span className="text-secondary font-bold">⚡</span>
            </div>
            <div className="mt-3">
              <div className="font-heading text-primary text-2xl font-bold dark:text-white">
                {avgTimePerQuestion}
              </div>
              <span className="text-secondary text-[11px] font-semibold dark:text-emerald-400">
                Nhanh hơn 12%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
