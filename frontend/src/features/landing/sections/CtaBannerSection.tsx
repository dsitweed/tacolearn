import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

export function CtaBannerSection() {
  const trustBadges = [
    { label: 'Không cần thẻ tín dụng' },
    { label: 'Kích hoạt tài khoản trong 1 phút' },
    { label: 'Hỗ trợ kỹ thuật 24/7' },
  ];

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-100 py-16 lg:py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-800/40 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 p-8 text-center text-white shadow-2xl sm:p-14">
          {/* Background Decorative Glow */}
          <div className="pointer-events-none absolute top-0 right-0 size-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-80 rounded-full bg-purple-500/15 blur-3xl" />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <Badge
              variant="outline"
              className="rounded-full border-indigo-400/40 bg-indigo-500/20 px-4 py-1 text-xs font-semibold text-indigo-300 backdrop-blur"
            >
              <Sparkles className="mr-1.5 size-3.5" />
              BẮT ĐẦU VỚI TACO LEARN SAAS
            </Badge>

            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Sẵn sàng nâng cao hiệu quả học Tiếng Nhật ngay hôm nay?
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Tham gia cùng hàng nghìn học viên và hàng chục trường Nhật ngữ
              đang tối ưu hóa lộ trình đỗ JLPT với thuật toán SRS Taco.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="h-13 w-full rounded-xl bg-indigo-600 px-8 text-base font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 sm:w-auto"
                asChild
              >
                <Link href="/register">
                  Đăng ký dùng thử 14 ngày
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-13 w-full rounded-xl border-slate-700 bg-slate-900/60 px-6 text-base font-semibold text-slate-200 hover:bg-slate-800 sm:w-auto"
                asChild
              >
                <Link href="/login">Đặt lịch Demo cho trường</Link>
              </Button>
            </div>

            {/* Trust Badges Under CTA */}
            <div className="flex flex-wrap items-center justify-center gap-6 border-t border-slate-800/80 pt-8 text-xs text-slate-400">
              {trustBadges.map((badge) => (
                <span key={badge.label} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
