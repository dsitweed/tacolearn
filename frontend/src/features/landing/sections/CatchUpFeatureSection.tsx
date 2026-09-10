import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

import { CatchUpGraphic } from '../components/CatchUpGraphic';

export function CatchUpFeatureSection() {
  const timeBreakdowns = [
    { time: '08 Phút', label: 'Video tóm tắt ngữ pháp' },
    { time: '10 Phút', label: 'Luyện phản xạ SRS' },
    { time: '06 Phút', label: 'Quiz chẩn đoán điểm yếu' },
  ];

  return (
    <section
      id="catch-up"
      className="bg-white py-16 lg:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="from-surface-container-low to-surface-container/60 rounded-3xl border border-slate-200/80 bg-gradient-to-br via-white p-8 shadow-xs sm:p-12 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="space-y-6 lg:col-span-7">
              <Badge
                variant="outline"
                className="text-secondary rounded-full border-emerald-300/60 bg-emerald-50 px-3 py-1 text-xs font-semibold dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
              >
                <Zap className="text-secondary mr-1.5 size-3.5 fill-current dark:text-emerald-400" />
                TÍNH NĂNG ĐẶC BIỆT: BẮT KỊP BÀI HỌC
              </Badge>

              <h2 className="text-primary text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl dark:text-white">
                Nghỉ 1 buổi học? Bắt kịp lớp trong 24 phút cô đọng.
              </h2>

              <p className="text-on-surface-variant text-base leading-relaxed dark:text-slate-300">
                Đừng để 1 buổi nghỉ ốm hay bận việc trở thành &quot;lỗ hổng kiến
                thức&quot; kéo dài. Taco Learn tự động trích xuất nội dung bài
                giảng thành một lộ trình ngắn hạn: 8 phút video tóm tắt ngữ
                pháp, 10 phút luyện tập phản xạ SRS, và 6 phút quiz chẩn đoán.
              </p>

              {/* Time Boxes */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {timeBreakdowns.map((item) => (
                  <div
                    key={item.time}
                    className="rounded-2xl border border-slate-200/80 bg-white p-3.5 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="text-secondary text-lg font-extrabold sm:text-xl dark:text-emerald-400">
                      {item.time}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-secondary h-12 w-full rounded-xl px-6 text-sm font-semibold text-white shadow-md hover:opacity-90 sm:w-auto"
                  asChild
                >
                  <Link href="/register">
                    <span>Thử ngay lộ trình 24 phút</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <span className="text-xs font-medium text-slate-500">
                  ⚡ Không lo mất gốc khi vắng mặt trên lớp
                </span>
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="lg:col-span-5">
              <CatchUpGraphic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
