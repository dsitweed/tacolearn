'use client';

import { CheckCircle2, HelpCircle, PlayCircle, Sparkles } from 'lucide-react';

import { Badge, Card, Progress } from '@/components/ui';

export function CatchUpGraphic() {
  const steps = [
    {
      id: '1',
      title: 'Video bài giảng 8 phút',
      desc: '08:00 • Hoàn thành',
      status: 'completed',
      icon: PlayCircle,
    },
    {
      id: '2',
      title: 'Bộ thẻ SRS 25 từ & ngữ pháp',
      desc: '10:00 • Hoàn thành',
      status: 'completed',
      icon: CheckCircle2,
    },
    {
      id: '3',
      title: 'Quiz kiểm tra 6 câu',
      desc: '06:00 • Đang thực hiện',
      status: 'in-progress',
      icon: HelpCircle,
    },
  ];

  return (
    <Card className="space-y-4 border-slate-800 bg-slate-950 p-5 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">
            Bài 32: Phán đoán 〜でしょう
          </span>
        </div>
        <Badge className="border-emerald-500/30 bg-emerald-500/20 text-[10px] text-emerald-300">
          Đã hoàn thành 2/3
        </Badge>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed';
          return (
            <div
              key={step.id}
              className={`flex items-center justify-between rounded-xl border p-3 text-xs transition-colors ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                  : 'border-indigo-500/40 bg-indigo-950/30 text-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`size-4 shrink-0 ${isCompleted ? 'text-emerald-400' : 'text-indigo-400'}`}
                />
                <div>
                  <div className="font-medium">{step.title}</div>
                  <div className="text-[10px] text-slate-400">{step.desc}</div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  isCompleted
                    ? 'border-emerald-500/30 text-emerald-400'
                    : 'animate-pulse border-indigo-500/40 text-indigo-300'
                }`}
              >
                {isCompleted ? 'Xong' : 'Đang học'}
              </Badge>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Tiến độ lộ trình 24 phút:</span>
          <span className="font-bold text-indigo-400">85%</span>
        </div>
        <Progress
          value={85}
          className="h-1.5 bg-slate-800 [&>div]:bg-indigo-500"
        />
        <p className="pt-1 text-[11px] text-emerald-400">
          💡 Bạn đã bù xong 85% kiến thức của buổi học ngày 10/09!
        </p>
      </div>
    </Card>
  );
}
