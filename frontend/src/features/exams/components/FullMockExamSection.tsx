import { ArrowRight, RotateCcw, Star, Timer, Volume2 } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button, Card } from '@/components/ui';

export function FullMockExamSection() {
  return (
    <section className="flex flex-col space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-primary h-6 w-2.5 rounded-full" />
          <div>
            <h3 className="font-heading text-primary text-lg font-bold tracking-tight sm:text-xl dark:text-white">
              Đề Thi Thử Toàn Diện (Full Mock Exam)
            </h3>
            <p className="text-on-surface-variant text-xs">
              Bộ bấm giờ thực tế đúng áp lực kỳ thi JLPT Quốc tế
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/exams"
          className="text-secondary flex items-center gap-1 text-xs font-semibold hover:underline dark:text-emerald-400"
        >
          <span>Xem tất cả 28 đề Full</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of 2 Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Mock Card 1: Official Past Exam */}
        <Card className="bg-surface-container-lowest group flex flex-col justify-between space-y-4 rounded-2xl border-slate-100 p-5 shadow-xs transition-all hover:shadow-md sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <Badge className="bg-surface-container text-primary rounded border-none px-2.5 py-0.5 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
                KỲ THI CHÍNH THỨC
              </Badge>
              <span className="text-outline-variant font-mono text-[11px]">
                #MOCK-N2-2312
              </span>
            </div>

            <h4 className="font-heading text-primary group-hover:text-secondary text-base font-bold transition-colors dark:text-white dark:group-hover:text-emerald-400">
              Đề thi thử JLPT N2 Chuẩn Cấu Trúc Thật (Kỳ 12/2023)
            </h4>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                <Timer className="size-3 text-slate-400" /> 105p Từ vựng - Ngữ
                pháp - Đọc
              </span>
              <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                <Volume2 className="size-3 text-slate-400" /> 50p Nghe
              </span>
              <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                <Star className="size-3 fill-amber-500 text-amber-500" /> 180
                Điểm
              </span>
            </div>

            {/* Cohort Stats */}
            <div className="text-on-surface-variant flex items-center justify-between border-t border-slate-100 pt-2 text-xs dark:border-slate-800">
              <span>1,420 học viên đã làm</span>
              <span className="text-primary font-semibold dark:text-white">
                Điểm TB: 108/180
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-outline flex items-center gap-1.5 text-xs font-medium">
              <span className="bg-outline size-2 rounded-full" /> Chưa làm
            </span>

            <Button
              size="sm"
              className="bg-primary text-on-primary hover:bg-primary-container flex h-9 items-center gap-1.5 rounded-lg px-4 text-xs font-semibold shadow-xs"
            >
              <span>Vào phòng thi thử</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </Card>

        {/* Mock Card 2: Prediction Special */}
        <Card className="bg-surface-container-lowest group flex flex-col justify-between space-y-4 rounded-2xl border-slate-100 p-5 shadow-xs transition-all hover:shadow-md sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <Badge className="bg-secondary-container/50 text-secondary flex items-center gap-1 rounded border-none px-2.5 py-0.5 text-[11px] font-semibold dark:bg-emerald-950/80 dark:text-emerald-300">
                <Star className="size-3 fill-current" /> TACO SPECIAL PREDICTION
              </Badge>
              <span className="text-outline-variant font-mono text-[11px]">
                #PRED-N2-2407
              </span>
            </div>

            <h4 className="font-heading text-primary group-hover:text-secondary text-base font-bold transition-colors dark:text-white dark:group-hover:text-emerald-400">
              Đề thi thử N2 Dự Đoán Đề Tháng 7/2024 (Đề số 01)
            </h4>

            <p className="text-on-surface-variant text-xs leading-relaxed">
              Độc quyền biên soạn bởi Sensei Tanaka & cựu giảng viên Tokyo Univ,
              quét toàn bộ xu hướng ngữ pháp mới.
            </p>

            <div className="flex flex-wrap gap-1.5">
              <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                155 phút tổng
              </span>
              <span className="bg-secondary-fixed/30 text-on-secondary-fixed-variant inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-semibold dark:bg-emerald-950 dark:text-emerald-300">
                Kèm đáp án chi tiết & audio script
              </span>
            </div>

            {/* Cohort Stats */}
            <div className="text-on-surface-variant flex items-center justify-between border-t border-slate-100 pt-2 text-xs dark:border-slate-800">
              <span className="text-secondary font-semibold dark:text-emerald-400">
                Đã làm 1 lần
              </span>
              <span className="text-primary font-semibold dark:text-white">
                Điểm cao nhất: 114/180
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-surface-container hover:bg-surface-container-high text-primary h-9 flex-1 rounded-lg border-none text-xs font-semibold dark:bg-slate-800 dark:text-white"
            >
              Xem kết quả cũ
            </Button>

            <Button
              size="sm"
              className="bg-primary text-on-primary hover:bg-primary-container flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold shadow-xs"
            >
              <RotateCcw className="size-3.5" />
              <span>Làm lại đề</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
