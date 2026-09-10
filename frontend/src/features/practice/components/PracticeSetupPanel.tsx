import { RefreshCw, SlidersHorizontal, Verified } from 'lucide-react';

import { Button, Card } from '@/components/ui';

interface PracticeSetupPanelProps {
  level: string;
  onLevelChange: (lvl: string) => void;
  section: string;
  onSectionChange: (sec: string) => void;
  mode: string;
  onModeChange: (m: string) => void;
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  onResetConfig: () => void;
  onRefreshQuestions: () => void;
}

export function PracticeSetupPanel({
  level,
  onLevelChange,
  section,
  onSectionChange,
  mode,
  onModeChange,
  questionCount,
  onQuestionCountChange,
  onResetConfig,
  onRefreshQuestions,
}: PracticeSetupPanelProps) {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const sections = [
    { id: 'goi', label: 'Từ vựng' },
    { id: 'bunpou', label: 'Ngữ pháp' },
    { id: 'dokkai', label: 'Đọc hiểu' },
    { id: 'choukai', label: 'Nghe hiểu' },
  ];
  const modes = [
    { id: 'weakness', label: 'Điểm yếu' },
    { id: 'ai', label: 'Đề xuất AI' },
  ];
  const counts = [10, 20, 50];

  return (
    <Card className="bg-surface-container-lowest mb-6 rounded-2xl border-slate-100 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-primary size-5 dark:text-indigo-400" />
          <h3 className="font-heading text-primary text-base font-bold dark:text-white">
            Thiết lập phiên luyện tập thích ứng
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-on-surface-variant">
            Chế độ tự động lưu tiến trình:
          </span>
          <span className="text-secondary flex items-center gap-1.5 font-semibold dark:text-emerald-400">
            <span className="bg-secondary size-2 animate-pulse rounded-full" />
            Đang kích hoạt
          </span>
        </div>
      </div>

      {/* Parameter selectors Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* 1. JLPT Level */}
        <div className="flex flex-col gap-1.5">
          <label className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
            Trình độ JLPT
          </label>
          <div className="bg-surface-container-low grid grid-cols-5 gap-1 rounded-xl p-1 dark:bg-slate-800/40">
            {levels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onLevelChange(lvl)}
                className={`rounded-lg py-1.5 text-center text-xs font-semibold transition-all ${
                  level === lvl
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
            Phần thi (Section)
          </label>
          <div className="bg-surface-container-low grid grid-cols-4 gap-1 rounded-xl p-1 dark:bg-slate-800/40">
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSectionChange(sec.id)}
                className={`truncate rounded-lg px-1 py-1.5 text-center text-xs font-semibold transition-all ${
                  section === sec.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Practice Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
            Chế độ luyện
          </label>
          <div className="bg-surface-container-low grid grid-cols-2 gap-1 rounded-xl p-1 dark:bg-slate-800/40">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onModeChange(m.id)}
                className={`truncate rounded-lg px-2 py-1.5 text-center text-xs font-semibold transition-all ${
                  mode === m.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Question count */}
        <div className="flex flex-col gap-1.5">
          <label className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
            Số lượng câu hỏi
          </label>
          <div className="bg-surface-container-low grid grid-cols-3 gap-1 rounded-xl p-1 dark:bg-slate-800/40">
            {counts.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onQuestionCountChange(c)}
                className={`rounded-lg py-1.5 text-center text-xs font-semibold transition-all ${
                  questionCount === c
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {c} câu
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary estimate banner & Session Trigger */}
      <div className="bg-surface-container-low/60 mt-4 flex flex-col items-start justify-between gap-3 rounded-xl border-t border-slate-100 p-3.5 pt-4 text-xs md:flex-row md:items-center dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex items-center gap-2.5">
          <Verified className="text-secondary size-5 shrink-0 dark:text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-on-surface font-bold dark:text-white">
              Cấu hình: JLPT {level} · Đọc hiểu trung văn · {questionCount} câu
              hỏi chọn lọc
            </span>
            <span className="text-on-surface-variant text-[11px]">
              Ước tính thời gian: ~15 phút · Hệ thống tự động đẩy từ vựng chưa
              vững vào SRS Flashcards
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-end md:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetConfig}
            className="bg-surface-container text-on-surface hover:bg-surface-variant h-8 rounded-lg px-3 text-xs dark:bg-slate-800 dark:text-white"
          >
            Tải lại cấu hình
          </Button>

          <Button
            size="sm"
            onClick={onRefreshQuestions}
            className="bg-primary text-on-primary hover:bg-primary-container flex h-8 items-center gap-1.5 rounded-lg px-4 text-xs font-semibold shadow-2xs"
          >
            <RefreshCw className="size-3.5" />
            <span>Làm mới bộ câu hỏi</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
