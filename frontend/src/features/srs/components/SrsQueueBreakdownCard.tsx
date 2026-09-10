import { Layers } from 'lucide-react';

import { Badge, Card } from '@/components/ui';

export function SrsQueueBreakdownCard() {
  return (
    <Card className="bg-surface-container-lowest rounded-xl border-slate-100 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div className="text-on-surface flex items-center gap-2 font-bold dark:text-slate-200">
          <Layers className="text-primary size-4 dark:text-indigo-400" />
          <span>Hàng đợi hôm nay (Queue Breakdown)</span>
        </div>
        <Badge className="bg-surface-container text-primary hover:bg-surface-container border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
          Tổng: 20
        </Badge>
      </div>

      <div className="space-y-2 text-xs">
        {/* Item 1: New Cards */}
        <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-2.5 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="bg-secondary size-2.5 rounded-full" />
            <span className="text-on-surface dark:text-slate-200">
              Thẻ mới từ Lesson 18
            </span>
          </div>
          <span className="text-primary font-bold dark:text-white">8 thẻ</span>
        </div>

        {/* Item 2: Review Cards */}
        <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-2.5 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="bg-primary size-2.5 rounded-full dark:bg-indigo-400" />
            <span className="text-on-surface dark:text-slate-200">
              Ôn tập định kỳ (Review)
            </span>
          </div>
          <span className="text-primary font-bold dark:text-white">10 thẻ</span>
        </div>

        {/* Item 3: Lapses */}
        <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-2.5 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="bg-error size-2.5 rounded-full" />
            <span className="text-on-surface dark:text-slate-200">
              Cần củng cố lại (Lapses)
            </span>
          </div>
          <span className="text-error font-bold">2 thẻ</span>
        </div>
      </div>

      {/* Mini Ratio Queue Bar */}
      <div className="mt-3 flex h-2 w-full gap-0.5 overflow-hidden rounded-full">
        <div
          className="bg-secondary h-full"
          style={{ width: '40%' }}
          title="Thẻ mới"
        />
        <div
          className="bg-primary h-full dark:bg-indigo-400"
          style={{ width: '50%' }}
          title="Ôn tập"
        />
        <div
          className="bg-error h-full"
          style={{ width: '10%' }}
          title="Lapses"
        />
      </div>
    </Card>
  );
}
