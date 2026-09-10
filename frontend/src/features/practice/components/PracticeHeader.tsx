import { Brain, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui';

export function PracticeHeader() {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {/* Breadcrumbs */}
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
          Luyện tập thích ứng theo điểm yếu
        </Link>
        <ChevronRight className="text-outline size-3" />
        <span className="text-primary font-semibold">
          Bộ đề N2 Đọc hiểu chuyên sâu
        </span>
      </nav>

      {/* Header Title & Badges */}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <div className="flex max-w-3xl flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-heading text-primary text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              Luyện đề JLPT Thông minh
            </h1>
            <Badge className="bg-primary text-on-primary inline-flex items-center gap-1.5 rounded-full border-none px-2.5 py-0.5 text-xs font-semibold shadow-xs">
              <Brain className="text-secondary-fixed size-3" />
              <span>AI Chẩn đoán điểm yếu v2.4</span>
            </Badge>
            <Badge className="bg-secondary-fixed text-on-secondary-fixed inline-flex items-center gap-1.5 rounded-full border-none px-2.5 py-0.5 text-xs font-semibold">
              <span className="bg-secondary size-1.5 rounded-full" />
              <span>Live SRS Synced</span>
            </Badge>
          </div>
          <p className="text-on-surface-variant text-xs leading-relaxed sm:text-sm">
            Hệ thống tự động phân tích lỗ hổng kiến thức từ 142 bài kiểm tra gần
            nhất để tối ưu hoá điểm số mục tiêu N2 của bạn.
          </p>
        </div>

        {/* Quick Session Stats Pill */}
        <div className="bg-surface-container-lowest flex items-center gap-4 rounded-xl border border-slate-100 px-4 py-2 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col">
            <span className="text-on-surface-variant text-[11px] font-medium">
              Mục tiêu tháng này
            </span>
            <span className="font-heading text-primary text-base font-bold dark:text-white">
              N2 · 145/180
            </span>
          </div>
          <div className="bg-surface-container h-8 w-px dark:bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-on-surface-variant text-[11px] font-medium">
              Điểm yếu đã bù
            </span>
            <span className="font-heading text-secondary text-base font-bold dark:text-emerald-400">
              +18.5%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
