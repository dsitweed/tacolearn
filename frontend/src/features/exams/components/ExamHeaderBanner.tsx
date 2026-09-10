import { BarChart3, History } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

interface ExamHeaderBannerProps {
  onMyStatsClick?: () => void;
  onHistoryClick?: () => void;
}

export function ExamHeaderBanner({
  onMyStatsClick,
  onHistoryClick,
}: ExamHeaderBannerProps) {
  return (
    <div className="flex flex-col justify-between gap-4 pt-1 lg:flex-row lg:items-center">
      <div className="flex flex-col space-y-2">
        {/* Breadcrumb */}
        <nav className="text-on-surface-variant flex items-center gap-1.5 text-xs font-medium">
          <Link
            href="/dashboard"
            className="hover:text-primary flex items-center gap-1 transition-colors"
          >
            Trang chủ
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface-variant">Luyện đề JLPT</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-semibold">
            Kho đề & Chế độ luyện tập
          </span>
        </nav>

        {/* Title */}
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="font-heading text-primary text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl dark:text-white">
            Kho Đề & Trung Tâm Luyện Thi JLPT
          </h1>
          <Badge className="bg-surface-container-high text-primary hover:bg-surface-container-high rounded-full border-none px-2.5 py-0.5 text-xs font-bold tracking-wide dark:bg-slate-800 dark:text-slate-200">
            v2.4 PRO
          </Badge>
        </div>

        <p className="text-on-surface-variant max-w-3xl text-xs leading-relaxed sm:text-sm">
          Kho hơn 150+ đề thi chuẩn cấu trúc JLPT thật (2018 - 2024) và hệ thống
          bài tập thích ứng AI tự động phát hiện, lấp lỗ hổng kiến thức trước
          ngày thi thực tế.
        </p>
      </div>

      {/* Right Header Actions */}
      <div className="flex shrink-0 flex-wrap items-center gap-2.5 self-start lg:self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onMyStatsClick}
          className="bg-surface-container-lowest text-on-surface hover:bg-surface-container flex h-9 items-center gap-1.5 border-slate-200 text-xs font-semibold shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          <BarChart3 className="text-secondary size-4 dark:text-emerald-400" />
          <span>Thống kê luyện đề của tôi</span>
        </Button>

        <Button
          size="sm"
          onClick={onHistoryClick}
          className="bg-primary text-on-primary hover:bg-primary-container flex h-9 items-center gap-1.5 text-xs font-semibold shadow-xs"
        >
          <History className="size-4" />
          <span>Lịch sử làm bài</span>
        </Button>
      </div>
    </div>
  );
}
