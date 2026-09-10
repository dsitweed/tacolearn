import { CheckCircle2, Clock } from 'lucide-react';

import { Badge } from '@/components/ui';

export function DashboardWelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Decorative Blur Spheres from Figma */}
      <div className="pointer-events-none absolute -top-16 -right-12 size-80 rounded-full bg-emerald-300/20 blur-2xl" />
      <div className="pointer-events-none absolute right-32 -bottom-10 size-48 rounded-full bg-indigo-200/50 blur-xl dark:bg-indigo-900/20" />

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Left Welcome Text */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[#081534] lg:text-3xl dark:text-white">
              Chào buổi sáng, Minh! 👋
            </h1>
            <Badge
              variant="secondary"
              className="rounded-full bg-[#DEE8FF] px-2.5 py-0.5 text-xs font-semibold text-[#45464E] dark:bg-slate-800 dark:text-slate-300"
            >
              <span className="mr-1.5 size-1.5 rounded-full bg-[#006C4A]" />
              Lớp N3 - Khóa K24
            </Badge>
          </div>

          <p className="max-w-2xl text-sm text-[#45464E] dark:text-slate-300">
            Hôm nay bạn có{' '}
            <strong className="text-[#081534] dark:text-white">
              24 thẻ SRS cần ôn
            </strong>{' '}
            và{' '}
            <strong className="text-[#081534] dark:text-white">
              1 buổi học trực tiếp
            </strong>{' '}
            lúc 09:30 cùng Tanaka Sensei (
            <span className="font-japanese text-xs text-slate-500">
              田中先生 • 文法・語彙
            </span>
            ).
          </p>
        </div>

        {/* Right Session Status Pill */}
        <div className="flex shrink-0 flex-col justify-center rounded-xl border border-slate-200/60 bg-[#F0F3FF] p-3.5 shadow-2xs sm:min-w-[340px] dark:border-slate-800 dark:bg-slate-800/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#111C2D] dark:text-slate-200">
            <span className="size-2 rounded-full bg-[#006C4A]" />
            <span>Tiết học tiếp theo</span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 font-normal text-[#45464E] dark:text-slate-400">
              <Clock className="size-3 text-[#45464E]" />
              09:30 - 11:30 (Hôm nay)
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Badge className="bg-[#D8E3FB] px-2 py-0.5 text-[11px] font-bold text-[#081534] hover:bg-[#D8E3FB] dark:bg-indigo-950 dark:text-indigo-200">
              PHÒNG N3-A
            </Badge>
            <span className="flex items-center gap-1 text-xs font-medium text-[#006C4A] dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              Đã điểm danh trước
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
