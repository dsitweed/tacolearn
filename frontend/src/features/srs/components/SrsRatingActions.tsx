interface SrsRatingActionsProps {
  onRate: (level: 'again' | 'hard' | 'good' | 'easy') => void;
}

export function SrsRatingActions({ onRate }: SrsRatingActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {/* Rating 1: Again */}
      <button
        type="button"
        onClick={() => onRate('again')}
        className="bg-surface-container-lowest hover:bg-error-container/40 group flex flex-col items-start justify-between rounded-xl border border-slate-100 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex w-full items-center justify-between">
          <span className="font-heading text-error text-base font-bold">
            Again
          </span>
          <kbd className="bg-surface-container text-on-surface-variant group-hover:bg-surface-container-lowest rounded px-1.5 py-0.5 text-[10px] font-semibold dark:bg-slate-800">
            1
          </kbd>
        </div>
        <div className="mt-2.5">
          <span className="text-on-surface-variant block text-[11px]">
            Khoảng thời gian:
          </span>
          <span className="text-error text-xs font-bold">&lt; 10 phút</span>
        </div>
      </button>

      {/* Rating 2: Hard */}
      <button
        type="button"
        onClick={() => onRate('hard')}
        className="bg-surface-container-lowest group flex flex-col items-start justify-between rounded-xl border border-slate-100 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-100/60 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex w-full items-center justify-between">
          <span className="font-heading text-on-tertiary-container text-base font-bold dark:text-amber-400">
            Hard
          </span>
          <kbd className="bg-surface-container text-on-surface-variant group-hover:bg-surface-container-lowest rounded px-1.5 py-0.5 text-[10px] font-semibold dark:bg-slate-800">
            2
          </kbd>
        </div>
        <div className="mt-2.5">
          <span className="text-on-surface-variant block text-[11px]">
            Khoảng thời gian:
          </span>
          <span className="text-on-tertiary-container text-xs font-bold dark:text-amber-400">
            1 ngày (Ngày mai)
          </span>
        </div>
      </button>

      {/* Rating 3: Good */}
      <button
        type="button"
        onClick={() => onRate('good')}
        className="bg-surface-container-lowest hover:bg-surface-container-highest group flex flex-col items-start justify-between rounded-xl border border-slate-100 p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex w-full items-center justify-between">
          <span className="font-heading text-primary text-base font-bold dark:text-indigo-300">
            Good
          </span>
          <kbd className="bg-surface-container text-on-surface-variant group-hover:bg-surface-container-lowest rounded px-1.5 py-0.5 text-[10px] font-semibold dark:bg-slate-800">
            3
          </kbd>
        </div>
        <div className="mt-2.5">
          <span className="text-on-surface-variant block text-[11px]">
            Khoảng thời gian:
          </span>
          <span className="text-primary text-xs font-bold dark:text-indigo-300">
            4 ngày tới
          </span>
        </div>
      </button>

      {/* Rating 4: Easy */}
      <button
        type="button"
        onClick={() => onRate('easy')}
        className="bg-secondary text-on-secondary group flex flex-col items-start justify-between rounded-xl border-none p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
      >
        <div className="flex w-full items-center justify-between">
          <span className="font-heading text-base font-bold text-white">
            Easy
          </span>
          <kbd className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            4
          </kbd>
        </div>
        <div className="mt-2.5">
          <span className="block text-[11px] text-white/80">
            Khoảng thời gian:
          </span>
          <span className="text-xs font-bold text-white">10 ngày tới</span>
        </div>
      </button>
    </div>
  );
}
