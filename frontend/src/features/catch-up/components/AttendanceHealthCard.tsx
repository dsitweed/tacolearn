import { FileUp, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';

import { Badge, Button, Card } from '@/components/ui';

export function AttendanceHealthCard() {
  const handleUploadExcuse = () => {
    toast.info('Mở hộp thoại nộp chứng từ y tế / công tác xin phép nghỉ học.');
  };

  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-4 rounded-2xl border-slate-100 p-5 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="text-primary size-4 dark:text-indigo-400" />
          <h3 className="font-heading text-primary text-base font-bold dark:text-white">
            Sức khỏe Chuyên cần
          </h3>
        </div>

        <Badge className="bg-surface-container text-primary rounded border-none px-2 py-0.5 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
          Kỳ 2024-Autumn
        </Badge>
      </div>

      {/* Visual Progress Donut & Legend */}
      <div className="bg-surface-container-low flex flex-col items-center gap-5 rounded-xl border border-slate-100 p-4 sm:flex-row dark:border-slate-800 dark:bg-slate-800/40">
        {/* SVG Progress Donut */}
        <div className="relative flex size-24 shrink-0 items-center justify-center">
          <svg className="size-full -rotate-90 transform" viewBox="0 0 36 36">
            <path
              className="text-surface-container-highest dark:text-slate-700"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <path
              className="text-secondary"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="92, 100"
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-heading text-primary text-lg font-bold dark:text-white">
              92%
            </span>
            <span className="text-on-surface-variant text-[10px]">
              Tỉ lệ đạt
            </span>
          </div>
        </div>

        {/* Legend stats */}
        <div className="flex w-full flex-1 flex-col gap-2 text-xs font-medium">
          <div className="text-on-surface flex items-center justify-between dark:text-slate-200">
            <span className="flex items-center gap-2">
              <span className="bg-secondary size-2 rounded-full" />
              Có mặt
            </span>
            <span className="text-primary font-bold dark:text-white">
              46 buổi
            </span>
          </div>

          <div className="text-on-surface flex items-center justify-between dark:text-slate-200">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500" />
              Đi muộn
            </span>
            <span className="text-primary font-bold dark:text-white">
              2 buổi
            </span>
          </div>

          <div className="text-on-surface flex items-center justify-between dark:text-slate-200">
            <span className="flex items-center gap-2">
              <span className="bg-error size-2 rounded-full" />
              Vắng mặt
            </span>
            <span className="text-error font-bold">2 buổi</span>
          </div>
        </div>
      </div>

      {/* Medical / Official Leave Upload Box */}
      <div className="bg-surface-container-low flex flex-col gap-2 rounded-xl border border-slate-100 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/40">
        <span className="text-on-surface font-bold dark:text-white">
          Nghỉ học có lý do chính đáng?
        </span>

        <p className="text-on-surface-variant text-[11px] leading-relaxed">
          Nộp giấy xác nhận của bác sĩ hoặc công tác để bảo lưu 100% điểm chuyên
          cần mà không bị trừ tỷ lệ.
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={handleUploadExcuse}
          className="bg-surface-container-lowest hover:bg-surface-container text-primary mt-1 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border-slate-200 text-xs font-semibold shadow-2xs transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <FileUp className="size-3.5" />
          <span>Nộp đơn xin phép & Chứng từ y tế</span>
        </Button>
      </div>
    </Card>
  );
}
