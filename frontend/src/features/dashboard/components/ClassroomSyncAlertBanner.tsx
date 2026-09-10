import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

export function ClassroomSyncAlertBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#081534] via-[#1E2A4A] to-[#081534] p-6 text-white shadow-md">
      {/* Background Decorative Watermark */}
      <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-10">
        <Sparkles className="size-40 text-white" />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Left Content */}
        <div className="flex max-w-3xl items-start gap-4">
          <div className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 shadow-xs sm:flex">
            <BookOpen className="size-6 text-white" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge className="bg-emerald-400/25 text-[10px] font-bold tracking-wider text-emerald-300 uppercase hover:bg-emerald-400/25">
                ĐỒNG BỘ MỚI TỪ LỚP HỌC
              </Badge>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="size-3 text-slate-400" />
                Vừa cập nhật 15 phút trước
              </span>
            </div>

            <h3 className="text-lg leading-snug font-bold text-white sm:text-xl">
              Tanaka Sensei vừa hoàn tất: Lesson 18 - Diễn đạt Phủ định một phần
              (〜わけではない)
            </h3>

            <p className="text-sm leading-relaxed text-indigo-100/90">
              Hệ thống đã tự động trích xuất{' '}
              <strong>12 thẻ ngữ pháp tương quan</strong> và{' '}
              <strong>1 bài tập chẩn đoán 5 phút</strong> để củng cố ngay sau
              giờ học.
            </p>
          </div>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-lg bg-white/10 px-4 text-xs font-semibold text-white hover:bg-white/20"
            asChild
          >
            <Link href="/dashboard">Xem slide bài học</Link>
          </Button>

          <Button
            size="sm"
            className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <span>Luyện bộ thẻ mới (12)</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
