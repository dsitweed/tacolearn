import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

export function ClassroomSyncAlertBanner() {
  return (
    <div className="from-primary via-primary-container to-primary relative overflow-hidden rounded-xl bg-gradient-to-r p-6 text-white shadow-md">
      {/* Background Decorative Watermark */}
      <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-10">
        <Sparkles className="size-40 text-white" />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Left Content */}
        <div className="flex max-w-3xl items-start gap-4">
          <div className="bg-secondary hidden size-12 shrink-0 items-center justify-center rounded-xl shadow-xs sm:flex">
            <BookOpen className="size-6 text-white" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge className="bg-secondary-container/30 text-secondary-fixed hover:bg-secondary-container/30 text-[10px] font-bold tracking-wider uppercase">
                ĐỒNG BỘ MỚI TỪ LỚP HỌC
              </Badge>
              <span className="text-inverse-primary flex items-center gap-1">
                <Clock className="text-inverse-primary size-3" />
                Vừa cập nhật 15 phút trước
              </span>
            </div>

            <h3 className="font-heading text-lg leading-snug font-bold text-white sm:text-xl">
              Tanaka Sensei vừa hoàn tất: Lesson 18 - Diễn đạt Phủ định một phần
              (〜わけではない)
            </h3>

            <p className="text-primary-fixed text-sm leading-relaxed">
              Hệ thống đã tự động trích xuất{' '}
              <strong className="text-white">12 thẻ ngữ pháp tương quan</strong>{' '}
              và{' '}
              <strong className="text-white">1 bài tập chẩn đoán 5 phút</strong>{' '}
              để củng cố ngay sau giờ học.
            </p>
          </div>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-lg bg-white/15 px-4 text-xs font-semibold text-white hover:bg-white/25"
            asChild
          >
            <Link href="/dashboard">Xem slide bài học</Link>
          </Button>

          <Button
            size="sm"
            className="bg-secondary h-9 rounded-lg px-4 text-xs font-bold text-white shadow-xs hover:opacity-90"
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
