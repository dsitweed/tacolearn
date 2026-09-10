import { ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

import { Badge, Card } from '@/components/ui';

export function AttendanceSyncMechanismCard() {
  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-4 rounded-2xl border-slate-100 p-5 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-secondary-fixed text-secondary flex size-10 items-center justify-center rounded-xl dark:bg-emerald-950 dark:text-emerald-300">
          <RefreshCw className="size-5" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-heading text-primary text-base font-bold dark:text-white">
            Cơ chế Tự động Đảo Trạng thái
          </h3>
          <span className="text-secondary text-xs font-semibold dark:text-emerald-400">
            Seamless Attendance Sync
          </span>
        </div>
      </div>

      {/* Sync Explanation Box */}
      <div className="text-on-surface-variant bg-surface-container-low flex flex-col gap-2.5 rounded-xl border border-slate-100 p-4 text-xs dark:border-slate-800 dark:bg-slate-800/40">
        <div className="text-on-surface flex items-start gap-2 dark:text-slate-200">
          <ShieldCheck className="text-secondary mt-0.5 size-4 shrink-0" />
          <span className="font-medium">
            Ngay khi hoàn thành 4 chặng, trạng thái buổi học sẽ tự động chuyển
            đổi:
          </span>
        </div>

        {/* State Transition Visual Box */}
        <div className="bg-surface-container-lowest my-1 flex items-center justify-center gap-2.5 rounded-lg border border-slate-100 py-2 dark:border-slate-800 dark:bg-slate-900">
          <Badge className="bg-error-container text-on-error-container border-none px-2 py-0.5 text-[11px] font-semibold">
            Vắng mặt (Absent)
          </Badge>
          <ArrowRight className="text-on-surface-variant size-3.5" />
          <Badge className="bg-secondary-fixed text-on-secondary-fixed border-none px-2 py-0.5 text-[11px] font-semibold">
            Đã học bù đạt chuẩn
          </Badge>
        </div>

        <p className="pt-1 text-[11px] leading-relaxed">
          <strong className="text-primary font-semibold dark:text-white">
            15 từ vựng + 3 cấu trúc ngữ pháp
          </strong>{' '}
          sẽ tự động cập nhật vào deck SRS của bạn vào{' '}
          <strong className="text-primary font-semibold dark:text-white">
            08:00 sáng mai
          </strong>
          , bảo đảm bạn không bị trôi kiến thức khi lên lớp buổi tiếp theo.
        </p>
      </div>
    </Card>
  );
}
