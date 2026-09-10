import { Zap } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button, Card } from '@/components/ui';

export function AiDiagnosticsCard() {
  const weakItems = [
    {
      type: 'HÁN TỰ KANJI',
      typeColor: 'text-[#BA1A1A] dark:text-red-400',
      kanjiSample: '晴 • 晴朗',
      desc: "Dễ nhầm lẫn bộ thủ 日 (Nhật) và nghĩa tương phản giữa 'mập mờ' và 'rõ ràng'.",
    },
    {
      type: 'NGỮ PHÁP',
      typeColor: 'text-[#EE6B09] dark:text-amber-400',
      kanjiSample: '〜わけではない',
      desc: 'Logic phủ định bộ phận trong văn cảnh giao tiếp công sở chưa phản xạ tự nhiên.',
    },
    {
      type: 'NGHE HIỂU',
      typeColor: 'text-[#081534] dark:text-slate-200',
      kanjiSample: '0.85x Speed',
      desc: 'Tỷ lệ nghe sai tăng 30% ở các đoạn hội thoại nói lướt nhanh của nhân viên trẻ.',
    },
  ];

  return (
    <Card className="border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#D8E3FB] text-[#081534] dark:bg-slate-800 dark:text-slate-100">
            <Zap className="size-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#081534] dark:text-white">
              Chẩn đoán AI: Vùng yếu
            </h3>
          </div>
        </div>

        <Badge
          variant="outline"
          className="border-slate-200 bg-[#F0F3FF] font-mono text-[11px] text-[#45464E] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          AI v3.2
        </Badge>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-[#45464E] dark:text-slate-400">
        Dựa trên 142 lượt phản hồi bài thi nhanh và SRS trong 7 ngày gần nhất:
      </p>

      {/* Weak items list */}
      <div className="space-y-3">
        {weakItems.map((item) => (
          <div
            key={item.type}
            className="space-y-1.5 rounded-xl border border-slate-100 bg-[#F0F3FF]/60 p-3.5 transition-colors hover:border-slate-200 dark:border-slate-800 dark:bg-slate-800/40"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] font-bold tracking-wider ${item.typeColor}`}
              >
                {item.type}
              </span>
              <span className="font-japanese text-sm font-bold tracking-widest text-[#081534] dark:text-white">
                {item.kanjiSample}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#45464E] dark:text-slate-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button
        className="mt-4 h-9 w-full rounded-lg bg-[#081534] text-xs font-semibold text-white shadow-xs hover:bg-[#162038] dark:bg-indigo-600 dark:hover:bg-indigo-700"
        asChild
      >
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-1.5"
        >
          <Zap className="size-3.5 fill-amber-400 text-amber-400" />
          <span>Luyện gói khắc phục điểm yếu</span>
        </Link>
      </Button>
    </Card>
  );
}
