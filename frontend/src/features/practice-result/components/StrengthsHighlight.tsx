import { CheckCircle2, Search, Zap } from 'lucide-react';

import { Card } from '@/components/ui';

export function StrengthsHighlight() {
  const strengths = [
    {
      percentage: '82% Chính xác',
      title: 'Nắm bắt ý chính bao quát',
      desc: 'Đọc lướt và xác định thông điệp chủ đạo bài viết rất chuẩn xác.',
      icon: CheckCircle2,
    },
    {
      percentage: '78% Chính xác',
      title: 'Tìm kiếm chi tiết (Scanning)',
      desc: 'Đối chiếu ngày tháng, số liệu và câu hỏi chứa 「なぜ」 không bị phân tâm.',
      icon: Search,
    },
    {
      percentage: 'Tốc độ rất tốt',
      title: 'Đoạn văn ngắn (短文)',
      desc: 'Hoàn thành dưới 1 phút/câu, tiết kiệm nhiều quỹ thời gian cho bài dài.',
      icon: Zap,
    },
  ];

  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-4 rounded-2xl border-slate-100 p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="text-secondary size-5 dark:text-emerald-400" />
        <h3 className="font-heading text-primary text-base font-bold sm:text-lg dark:text-white">
          Điểm sáng trong bài làm của bạn
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {strengths.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-surface-container-low flex flex-col justify-between rounded-xl border border-slate-100 p-4 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div>
                <span className="text-secondary flex items-center gap-1.5 text-[11px] font-bold dark:text-emerald-400">
                  <Icon className="size-3.5" />
                  {item.percentage}
                </span>

                <h4 className="font-heading text-primary mt-2 text-sm font-bold dark:text-white">
                  {item.title}
                </h4>

                <p className="text-on-surface-variant mt-1 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
