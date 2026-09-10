import { History, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui';

export function SrsEbbinghausCurveCard() {
  return (
    <Card className="bg-surface-container-lowest rounded-xl border-slate-100 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-1 flex items-center justify-between text-xs">
        <div className="text-on-surface flex items-center gap-2 font-bold dark:text-slate-200">
          <TrendingUp className="text-secondary size-4 dark:text-emerald-400" />
          <span>Đường cong trí nhớ Ebbinghaus</span>
        </div>
        <span className="text-secondary text-xs font-semibold dark:text-emerald-400">
          Thẻ: 曖昧
        </span>
      </div>

      <p className="text-on-surface-variant mb-3 text-xs">
        Mô hình hóa chu kỳ quên và điểm kích hoạt lặp lại tối ưu.
      </p>

      {/* Inline SVG Ebbinghaus Curve Visualization */}
      <div className="bg-surface-container-low rounded-lg p-2.5 dark:bg-slate-800/40">
        <svg
          aria-label="Ebbinghaus Curve Visualization"
          className="h-28 w-full overflow-visible"
          viewBox="0 0 280 110"
        >
          {/* Grid lines */}
          <line
            className="text-outline-variant/30"
            stroke="currentColor"
            strokeDasharray="2"
            x1="20"
            x2="270"
            y1="20"
            y2="20"
          />
          <line
            className="text-outline-variant/30"
            stroke="currentColor"
            strokeDasharray="2"
            x1="20"
            x2="270"
            y1="55"
            y2="55"
          />
          <line
            className="text-outline-variant/30"
            stroke="currentColor"
            strokeDasharray="2"
            x1="20"
            x2="270"
            y1="90"
            y2="90"
          />

          {/* Target Retention Threshold Line (60%) */}
          <line
            className="stroke-error/60"
            strokeDasharray="3"
            strokeWidth="1"
            x1="20"
            x2="270"
            y1="50"
            y2="50"
          />
          <text className="fill-error font-sans text-[8px]" x="22" y="46">
            Ngưỡng quên 60%
          </text>

          {/* Memory curves (3 review iterations) */}
          {/* Iteration 1 */}
          <path
            className="text-outline-variant"
            d="M 20 20 Q 40 85 60 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Review 1 spike */}
          <line
            className="stroke-secondary"
            strokeDasharray="2"
            strokeWidth="1.5"
            x1="60"
            x2="60"
            y1="90"
            y2="22"
          />

          {/* Iteration 2 (flatter curve) */}
          <path
            className="text-outline-variant"
            d="M 60 22 Q 100 65 140 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Review 2 spike */}
          <line
            className="stroke-secondary"
            strokeDasharray="2"
            strokeWidth="1.5"
            x1="140"
            x2="140"
            y1="70"
            y2="20"
          />

          {/* Iteration 3 (solid active curve) */}
          <path
            d="M 140 20 Q 200 45 260 52"
            fill="none"
            className="stroke-secondary"
            strokeWidth="2.5"
          />

          {/* Current Node (Today) */}
          <circle
            className="fill-primary animate-pulse dark:fill-white"
            cx="260"
            cy="52"
            r="5"
          />
          <circle cx="260" cy="52" fill="#ffffff" r="2.5" />
          <text
            className="fill-primary font-sans text-[9px] font-bold dark:fill-white"
            x="200"
            y="44"
          >
            Hôm nay (58%)
          </text>
        </svg>
      </div>

      <div className="text-on-surface-variant mt-2.5 flex items-center gap-1.5 text-xs">
        <History className="text-error size-3.5" />
        <span>
          Lần ôn gần nhất:{' '}
          <strong className="text-on-surface dark:text-white">
            3 ngày trước
          </strong>{' '}
          (Nhầm với 明確)
        </span>
      </div>
    </Card>
  );
}
