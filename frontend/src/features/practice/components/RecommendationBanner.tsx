import {
  AlertTriangle,
  BookOpen,
  Headphones,
  PlayCircle,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import { Button, Card } from '@/components/ui';

interface RecommendationBannerProps {
  onStart15mPractice: () => void;
  onSelectWeakness: (index: number) => void;
}

export function RecommendationBanner({
  onStart15mPractice,
  onSelectWeakness,
}: RecommendationBannerProps) {
  return (
    <Card className="bg-surface-container-lowest relative mb-6 overflow-hidden rounded-2xl border-slate-100 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Glow Blur */}
      <div className="bg-secondary-fixed/30 pointer-events-none absolute -top-16 -right-16 size-64 rounded-full blur-3xl" />

      {/* Top Banner Row */}
      <div className="relative z-10 mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="bg-surface-container text-primary flex size-9 items-center justify-center rounded-xl dark:bg-slate-800 dark:text-white">
            <SlidersHorizontal className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-primary text-lg font-bold dark:text-white">
              Đề xuất trọng tâm cho bạn
            </h2>
            <p className="text-on-surface-variant text-xs">
              Dựa trên kết quả thi thử & bài học gần nhất của học viên Minh Khoa
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={onStart15mPractice}
          className="bg-secondary text-on-secondary flex h-9 items-center gap-2 rounded-xl border-none px-4 text-xs font-semibold shadow-xs transition-transform hover:opacity-90 active:scale-95"
        >
          <PlayCircle className="size-4" />
          <span>Luyện tập điểm yếu ngay (15 phút)</span>
          <span className="bg-secondary-fixed text-on-secondary-fixed ml-1 rounded px-1.5 py-0.5 text-[10px] font-bold">
            AUTO-START
          </span>
        </Button>
      </div>

      {/* 3 Weak Skills Metric Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Weakness 1: Dokkai */}
        <div
          onClick={() => onSelectWeakness(1)}
          className="bg-surface-container-low hover:bg-surface-container flex cursor-pointer flex-col justify-between rounded-xl border border-transparent p-4 transition-colors hover:border-slate-200 dark:bg-slate-800/40 dark:hover:bg-slate-800"
        >
          <div className="mb-3 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-error bg-error-container/50 inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold">
                <AlertTriangle className="size-3" />
                Báo động đỏ
              </span>
              <span className="text-on-surface text-xs font-bold dark:text-white">
                1) Đọc hiểu (Reading)
              </span>
              <span className="text-on-surface-variant text-[11px]">
                Quan điểm tác giả (Author&apos;s Opinion)
              </span>
            </div>

            {/* Circular Gauge 48% */}
            <div className="relative flex size-12 shrink-0 items-center justify-center">
              <svg className="size-12 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-surface-variant dark:text-slate-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-error"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="48, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="text-on-surface absolute text-[11px] font-bold dark:text-white">
                48%
              </span>
            </div>
          </div>

          <div className="text-on-surface-variant flex items-center justify-between border-t border-slate-200/50 pt-2 text-[11px] dark:border-slate-700/50">
            <span className="text-error flex items-center gap-1">
              <X className="size-3.5" />8 câu hay sai gần đây
            </span>
            <span className="text-primary font-semibold underline dark:text-indigo-400">
              Chọn luyện
            </span>
          </div>
        </div>

        {/* Weakness 2: Choukai */}
        <div
          onClick={() => onSelectWeakness(2)}
          className="bg-surface-container-low hover:bg-surface-container flex cursor-pointer flex-col justify-between rounded-xl border border-transparent p-4 transition-colors hover:border-slate-200 dark:bg-slate-800/40 dark:hover:bg-slate-800"
        >
          <div className="mb-3 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="bg-tertiary-container text-on-tertiary-container inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold">
                Cần cải thiện
              </span>
              <span className="text-on-surface text-xs font-bold dark:text-white">
                2) Nghe hiểu (Listening)
              </span>
              <span className="text-on-surface-variant text-[11px]">
                Ý định người nói (Speaker Intention)
              </span>
            </div>

            {/* Circular Gauge 58% */}
            <div className="relative flex size-12 shrink-0 items-center justify-center">
              <svg className="size-12 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-surface-variant dark:text-slate-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-on-tertiary-container"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="58, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="text-on-surface absolute text-[11px] font-bold dark:text-white">
                58%
              </span>
            </div>
          </div>

          <div className="text-on-surface-variant flex items-center justify-between border-t border-slate-200/50 pt-2 text-[11px] dark:border-slate-700/50">
            <span className="text-on-tertiary-container flex items-center gap-1">
              <Headphones className="size-3.5" />5 đoạn hội thoại cần nghe lại
            </span>
            <span className="text-primary font-semibold underline dark:text-indigo-400">
              Chọn luyện
            </span>
          </div>
        </div>

        {/* Weakness 3: Bunpou */}
        <div
          onClick={() => onSelectWeakness(3)}
          className="bg-surface-container-low hover:bg-surface-container flex cursor-pointer flex-col justify-between rounded-xl border border-transparent p-4 transition-colors hover:border-slate-200 dark:bg-slate-800/40 dark:hover:bg-slate-800"
        >
          <div className="mb-3 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-secondary bg-secondary-fixed/50 inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold">
                Đang củng cố
              </span>
              <span className="text-on-surface text-xs font-bold dark:text-white">
                3) Ngữ pháp (Grammar)
              </span>
              <span className="text-on-surface-variant text-[11px]">
                Mẫu câu biểu hiện tương đồng
              </span>
            </div>

            {/* Circular Gauge 64% */}
            <div className="relative flex size-12 shrink-0 items-center justify-center">
              <svg className="size-12 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-surface-variant dark:text-slate-700"
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
                  strokeDasharray="64, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="text-on-surface absolute text-[11px] font-bold dark:text-white">
                64%
              </span>
            </div>
          </div>

          <div className="text-on-surface-variant flex items-center justify-between border-t border-slate-200/50 pt-2 text-[11px] dark:border-slate-700/50">
            <span className="text-secondary flex items-center gap-1 dark:text-emerald-400">
              <BookOpen className="size-3.5" />
              12 mẫu ngữ pháp N2
            </span>
            <span className="text-primary font-semibold underline dark:text-indigo-400">
              Chọn luyện
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
