import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { Card } from '@/components/ui';

export function WeeklyScheduleCard() {
  const sessions = [
    {
      id: 's1',
      date: 'HÔM NAY',
      dayNumber: '10',
      timeTitle: '09:30 • Ngữ pháp N3',
      tag: 'TRỰC TIẾP',
      tagBg: 'bg-[#006C4A] text-white',
      teacherRoom: 'Tanaka Sensei • Phòng N3-A',
      status: 'Đang chuẩn bị phòng học',
      highlighted: true,
    },
    {
      id: 's2',
      date: 'THỨ 6',
      dayNumber: '12',
      timeTitle: '14:00 • N3 Reading & Kanji',
      tag: 'LÝ THUYẾT',
      tagBg:
        'bg-[#E7EEFF] text-[#111C2D] dark:bg-slate-800 dark:text-slate-300',
      teacherRoom: 'Yamamoto Sensei • Phòng Lab B',
      status: 'Chuẩn bị trước bài đọc số 6',
      highlighted: false,
    },
    {
      id: 's3',
      date: 'THỨ 7',
      dayNumber: '13',
      timeTitle: '08:30 • Mock Test N3',
      tag: 'THI THỬ',
      tagBg:
        'bg-[#D8E3FB] text-[#081534] dark:bg-indigo-950 dark:text-indigo-300',
      teacherRoom: 'Thi thử tính giờ mô phỏng đề JLPT',
      status: 'Bắt buộc tham dự',
      highlighted: false,
    },
  ];

  return (
    <Card className="border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
            <Calendar className="size-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Lịch học tuần này
          </h3>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          Toàn bộ lịch
        </Link>
      </div>

      {/* Sessions list */}
      <div className="space-y-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
              s.highlighted
                ? 'border-emerald-200/80 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-800/40'
            }`}
          >
            {/* Date Pill */}
            <div
              className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-lg shadow-xs ${
                s.highlighted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <span className="text-[9px] font-bold tracking-wider uppercase">
                {s.date}
              </span>
              <span className="mt-0.5 text-base leading-none font-extrabold">
                {s.dayNumber}
              </span>
            </div>

            {/* Session Info */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="truncate text-xs font-bold text-slate-900 dark:text-white">
                  {s.timeTitle}
                </h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${s.tagBg}`}
                >
                  {s.tag}
                </span>
              </div>

              <p className="truncate text-[11px] text-slate-500">
                {s.teacherRoom}
              </p>

              <p
                className={`text-[11px] font-medium ${s.highlighted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}
              >
                {s.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
