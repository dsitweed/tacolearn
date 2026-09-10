import { ArrowUpRight, BarChart2, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Card, Progress } from '@/components/ui';

export function SkillBreakdownSection() {
  const skills = [
    {
      name: 'Từ vựng (語彙)',
      kanji: '語彙',
      statusBadge: 'VƯỢT CHỈ TIÊU',
      statusColor:
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      progressValue: 82,
      progressColor: '[&>div]:bg-emerald-600',
      statLabel: '820 / 1,000 từ',
      percent: '82%',
      percentColor: 'text-slate-900 dark:text-white',
    },
    {
      name: 'Nghe hiểu (聴解)',
      kanji: '聴解',
      statusBadge: 'ỔN ĐỊNH',
      statusColor:
        'bg-indigo-100 text-slate-800 dark:bg-indigo-950 dark:text-indigo-300',
      progressValue: 71,
      progressColor: '[&>div]:bg-emerald-600/80',
      statLabel: '34 / 48 bài nghe',
      percent: '71%',
      percentColor: 'text-slate-900 dark:text-white',
    },
    {
      name: 'Đọc hiểu (読解)',
      kanji: '読解',
      statusBadge: 'CẦN LUYỆN TỐC ĐỘ',
      statusColor:
        'bg-indigo-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      progressValue: 64,
      progressColor: '[&>div]:bg-slate-900 dark:[&>div]:bg-indigo-600',
      statLabel: '28 / 45 bài đọc',
      percent: '64%',
      percentColor: 'text-slate-900 dark:text-white',
    },
    {
      name: 'Ngữ pháp (文法)',
      kanji: '文法',
      statusBadge: 'TIẾN BỘ TỐT',
      statusColor:
        'bg-indigo-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      progressValue: 63,
      progressColor: '[&>div]:bg-slate-900 dark:[&>div]:bg-indigo-600',
      statLabel: '94 / 150 mẫu',
      percent: '63%',
      percentColor: 'text-slate-900 dark:text-white',
    },
    {
      name: 'Hán tự Kanji (漢字)',
      kanji: '漢字',
      statusBadge: 'ĐIỂM NGHẼN CẦN BÙ',
      statusColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
      progressValue: 51,
      progressColor: '[&>div]:bg-red-600',
      statLabel: '330 / 650 chữ',
      percent: '51%',
      percentColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <Card className="border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-indigo-600">
            <BarChart2 className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Phân tích kỹ năng JLPT N3
            </h2>
            <p className="text-xs text-slate-500">
              Đo lường tiến độ tích lũy dựa trên kết quả thi nội bộ & lịch sử
              SRS
            </p>
          </div>
        </div>

        <span className="hidden text-xs font-semibold text-slate-500 sm:inline-block">
          Cập nhật hôm nay
        </span>
      </div>

      {/* 5 Skills Progress Bars */}
      <div className="space-y-5">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {skill.name}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-700 uppercase dark:bg-slate-800 dark:text-slate-300">
                  {skill.statusBadge}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-slate-500">
                  {skill.statLabel}
                </span>
                <span className={`text-base font-bold ${skill.percentColor}`}>
                  {skill.percent}
                </span>
              </div>
            </div>

            <Progress
              value={skill.progressValue}
              className={`h-2.5 bg-indigo-100 dark:bg-slate-800 ${skill.progressColor}`}
            />
          </div>
        ))}
      </div>

      {/* Bottom Diagnostic Hint */}
      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-indigo-100/60 bg-indigo-50/50 p-3.5 text-xs text-slate-800 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            <strong>Gợi ý AI:</strong> Cần bổ sung 15 phút luyện Kanji mỗi ngày
            để kịp tiến độ chặng 2.
          </span>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          <span>Xem báo cáo</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </Card>
  );
}
