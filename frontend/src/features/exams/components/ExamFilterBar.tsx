import { Brain, CheckSquare, Search, Video } from 'lucide-react';

import { Badge } from '@/components/ui';

interface ExamFilterBarProps {
  selectedLevel: string;
  onSelectLevel: (lvl: string) => void;
  selectedSection: string;
  onSelectSection: (sec: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onlyUnattempted: boolean;
  onToggleUnattempted: () => void;
  hasVideoSolution: boolean;
  onToggleVideoSolution: () => void;
  aiCompiledOnly: boolean;
  onToggleAiCompiled: () => void;
}

export function ExamFilterBar({
  selectedLevel,
  onSelectLevel,
  selectedSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
  onlyUnattempted,
  onToggleUnattempted,
  hasVideoSolution,
  onToggleVideoSolution,
  aiCompiledOnly,
  onToggleAiCompiled,
}: ExamFilterBarProps) {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const sections = [
    { id: 'all', label: 'Tất cả phân môn (158)' },
    { id: 'goi', label: 'Từ vựng & Hán tự (Moji-Goi)' },
    { id: 'bunpou', label: 'Ngữ pháp (Bunpou)' },
    { id: 'dokkai', label: 'Đọc hiểu (Dokkai)' },
    { id: 'choukai', label: 'Nghe hiểu (Choukai)' },
    { id: 'full', label: 'Đề thi thử hoàn chỉnh (Full Mock)' },
  ];

  return (
    <div className="bg-surface-container-lowest flex flex-col space-y-4 rounded-2xl border border-slate-100 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Level Tabs & Global Filter Row */}
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        {/* JLPT Level Pills */}
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:pb-0">
          <span className="text-on-surface-variant shrink-0 pr-1 text-[11px] font-bold tracking-wider uppercase">
            CẤP ĐỘ:
          </span>
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const isGoal = lvl === 'N2';

            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onSelectLevel(lvl)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <span>{lvl}</span>
                {isGoal && (
                  <Badge className="bg-secondary text-on-secondary rounded-full border-none px-1.5 py-0 text-[9px] font-bold uppercase">
                    Mục tiêu
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Search Inside Exam Hub */}
        <div className="relative w-full lg:w-96">
          <Search className="text-outline absolute top-2.5 left-3 size-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo năm, dạng bài hoặc mã đề (vd: 12/2023, Dokkai Dạng 4...)"
            className="bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-secondary w-full rounded-lg border border-transparent py-2 pr-4 pl-9 text-xs outline-hidden transition-all focus:ring-2 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Section Categorization Chips & Feature Switches */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-1 dark:border-slate-800">
        {/* Section Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {sections.map((sec) => {
            const isSelected = selectedSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary text-on-primary font-semibold shadow-2xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            type="button"
            onClick={onToggleUnattempted}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              onlyUnattempted
                ? 'bg-secondary/15 text-secondary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <CheckSquare className="text-secondary size-3.5" />
            <span>Chỉ đề chưa làm</span>
          </button>

          <button
            type="button"
            onClick={onToggleVideoSolution}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              hasVideoSolution
                ? 'bg-secondary/15 text-secondary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Video className="text-secondary size-3.5" />
            <span>Có video chữa chi tiết</span>
          </button>

          <button
            type="button"
            onClick={onToggleAiCompiled}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              aiCompiledOnly
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Brain className="text-primary size-3.5" />
            <span>Đề AI biên soạn 2024</span>
          </button>
        </div>
      </div>
    </div>
  );
}
