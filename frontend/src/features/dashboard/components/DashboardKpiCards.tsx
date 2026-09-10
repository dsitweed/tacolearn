import { Award, ChevronRight, Flame, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui';

export function DashboardKpiCards() {
  const weekDays = [
    { day: 'T2', active: true },
    { day: 'T3', active: true },
    { day: 'T4', active: true },
    { day: 'T5', active: true },
    { day: 'T6', active: true },
    { day: 'T7', active: true },
    { day: 'CN', active: true, today: true },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: SRS Cards Due Today */}
      <Card className="border-slate-100 bg-white p-4 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="flex h-full flex-col justify-between p-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#45464E] uppercase">
                SRS CẦN ÔN HÔM NAY
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-heading text-[40px] leading-none font-bold tracking-tight text-[#081534] dark:text-white">
                  24
                </span>
                <span className="text-xs font-medium text-[#45464E]">
                  / 36 thẻ mới
                </span>
              </div>
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#85F5C1]/40 text-[#00714E] dark:bg-emerald-950/60 dark:text-emerald-400">
              <Sparkles className="size-4" />
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#45464E]">
              <span>16 Từ vựng</span>
              <span>•</span>
              <span>8 Ngữ pháp</span>
            </div>
            <Link
              href="/dashboard"
              className="mt-2.5 flex h-7 items-center justify-center gap-1 rounded-lg bg-[#081534] px-3 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#162038] dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              <span>Ôn tập ngay</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Streak Days */}
      <Card className="border-slate-100 bg-white p-4 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="flex h-full flex-col justify-between p-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#45464E] uppercase">
                CHUỖI LIÊN TỤC
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-heading text-[40px] leading-none font-bold tracking-tight text-[#006C4A] dark:text-emerald-400">
                  14
                </span>
                <span className="text-xs font-medium text-[#45464E]">ngày</span>
              </div>
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#F0F3FF] text-[#006C4A] dark:bg-slate-800 dark:text-emerald-400">
              <Flame className="size-4 fill-[#006C4A] text-[#006C4A] dark:fill-emerald-400" />
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-[#006C4A] dark:text-emerald-400">
              TUẦN NÀY ĐỀU ĐẶN
            </span>
            <div className="mt-1.5 flex items-center justify-between gap-1">
              {weekDays.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-400">{d.day}</span>
                  <div
                    className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all ${
                      d.today
                        ? 'bg-[#006C4A] ring-2 ring-[#85F5C1] ring-offset-1 dark:ring-emerald-700 dark:ring-offset-slate-900'
                        : d.active
                          ? 'bg-[#006C4A]'
                          : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                    }`}
                  >
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: JLPT N3 Target Completion */}
      <Card className="border-slate-100 bg-white p-4 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="flex h-full flex-col justify-between p-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#45464E] uppercase">
                MỤC TIÊU JLPT N3
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-heading text-[40px] leading-none font-bold tracking-tight text-[#081534] dark:text-white">
                  64%
                </span>
                <span className="text-xs font-medium text-[#45464E]">
                  tiến độ
                </span>
              </div>
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#E7EEFF] text-[#081534] dark:bg-slate-800 dark:text-slate-100">
              <Layers className="size-4" />
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#45464E]">
                Làm chủ nội dung
              </span>
              <span className="font-bold text-[#081534] dark:text-white">
                64 / 100%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#DEE8FF] dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-[#081534] transition-all dark:bg-indigo-500"
                style={{ width: '64%' }}
              />
            </div>
            <p className="text-right text-[11px] text-slate-500">
              Còn 86 ngày tới kỳ thi tháng 12
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Attendance Rate */}
      <Card className="border-slate-100 bg-white p-4 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="flex h-full flex-col justify-between p-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#45464E] uppercase">
                CHUYÊN CẦN TRƯỜNG
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-[40px] leading-none font-bold tracking-tight text-[#081534] dark:text-white">
                  96%
                </span>
                <span className="rounded bg-[#85F5C1]/40 px-1.5 py-0.5 text-[11px] font-semibold text-[#00714E] dark:bg-emerald-950/60 dark:text-emerald-400">
                  Xuất sắc
                </span>
              </div>
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#E7EEFF] text-[#081534] dark:bg-slate-800 dark:text-slate-100">
              <Award className="size-4" />
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-[#111C2D] dark:text-slate-200">
                24/25 buổi đã học
              </span>
              <span className="text-slate-500">1 buổi phép</span>
            </div>
            {/* Segmented attendance dots / bars */}
            <div className="flex items-center gap-1">
              <div className="h-1.5 flex-1 rounded-full bg-[#006C4A]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#006C4A]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#006C4A]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#006C4A]" />
              <div className="h-1.5 w-6 rounded-full bg-[#D8E3FB] dark:bg-slate-700" />
            </div>
            <p className="text-[11px] font-semibold text-[#45464E]">
              Đủ điều kiện dự thi nội bộ chặng 2
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
