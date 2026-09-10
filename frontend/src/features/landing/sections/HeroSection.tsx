import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

import { HeroMockup } from '../components/HeroMockup';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-10 size-[300px] rounded-full bg-purple-400/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Text Content */}
        <div className="mx-auto mb-12 flex max-w-4xl flex-col items-center space-y-6 text-center">
          {/* Eyebrow Badge */}
          <Badge
            variant="outline"
            className="rounded-full border-indigo-200 bg-indigo-50/80 px-4 py-2 text-[8px] font-semibold text-indigo-700 shadow-sm backdrop-blur sm:text-xs dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
          >
            <Sparkles className="size-4 animate-pulse text-yellow-500 dark:text-indigo-400" />
            <span>
              NỀN TẢNG HỌC TIẾNG NHẬT • KẾT NỐI LỚP HỌC & TRÍ NHỚ CÁ NHÂN HOÁ
            </span>
          </Badge>

          {/* Main Headline */}
          <h1 className="text-primary text-4xl leading-[1.15] font-extrabold tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
            Đồng bộ bài giảng trên lớp với{' '}
            <span className="from-primary via-primary-container to-secondary bg-gradient-to-r bg-clip-text text-transparent dark:from-indigo-300 dark:via-white dark:to-emerald-400">
              trí nhớ dài hạn
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-secondary text-xs font-semibold tracking-tight sm:text-base dark:text-emerald-400">
            Learn Japanese. Remember it. Improve every day.
            （学ぶ。覚える。伸ばす。）
          </p>

          {/* Explanatory Subtext */}
          <p className="text-on-surface-variant max-w-2xl text-base leading-relaxed sm:text-lg dark:text-slate-300">
            Nền tảng SaaS đầu tiên đồng bộ nội dung bài giảng tại trường học với
            hệ thống Lặp lại Ngắt quãng (Spaced Repetition) và Phân tích điểm
            yếu thời gian thực.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-container h-13 w-full rounded-xl px-8 text-base font-semibold text-white shadow-md sm:w-auto dark:bg-emerald-600 dark:hover:bg-emerald-700"
              asChild
            >
              <Link href="/register">
                <span>Bắt đầu học thử miễn phí</span>
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-13 w-full rounded-xl border-slate-300 px-6 text-base font-semibold text-slate-700 hover:bg-slate-100 sm:w-auto dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              asChild
            >
              <a href="#how-it-works">
                <Play className="mr-2 size-4 fill-current text-indigo-600 dark:text-indigo-400" />
                <span>Xem cách hoạt động (2 phút)</span>
              </a>
            </Button>
          </div>

          {/* Live Notification Toast Overlap */}
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
            <span className="flex size-2 animate-ping rounded-full bg-emerald-500" />
            <span>Lớp N3-K24 vừa đồng bộ 25 thẻ Kanji mới từ Bài 32</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Học viên ôn xong 94%
            </span>
          </div>
        </div>

        {/* Hero Visual SaaS App Mockup */}
        <HeroMockup />
      </div>
    </section>
  );
}
