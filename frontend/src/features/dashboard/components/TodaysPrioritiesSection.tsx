import {
  ArrowRight,
  BookOpen,
  CalendarCheck2,
  Clock,
  Headphones,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

import { Badge, Button, Card } from '@/components/ui';

export function TodaysPrioritiesSection() {
  return (
    <Card className="border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100/60 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Sparkles className="size-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Nhiệm vụ trọng tâm hôm nay
            </h2>
            <p className="text-xs text-slate-500">
              Được thuật toán AI sắp xếp theo thứ tự ưu tiên ghi nhớ & thời gian
              biểu
            </p>
          </div>
        </div>

        <Badge
          variant="secondary"
          className="bg-indigo-50 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          4 NHIỆM VỤ
        </Badge>
      </div>

      {/* Task List */}
      <div className="space-y-3.5">
        {/* Task 1: SRS Priority */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-indigo-100/60 bg-indigo-50/40 p-4 transition-colors hover:border-indigo-200 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
              <RotateCcw className="size-5" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-red-100 py-0 text-[10px] font-bold text-red-700 hover:bg-red-100 dark:bg-red-950/80 dark:text-red-300">
                  ƯU TIÊN CAO
                </Badge>
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  Hoàn thành 24 thẻ SRS đến hạn
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Ôn định kỳ để tránh rơi vào đường cong quên lãng Ebbinghaus.
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="size-3 text-slate-400" />
                  ~10-15 phút
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  +50 Điểm chuyên cần
                </span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            className="h-9 w-full shrink-0 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 sm:w-auto"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <span>Bắt đầu ôn thẻ</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Task 2: Live Class */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-slate-200 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/20">
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs dark:bg-indigo-600">
              <CalendarCheck2 className="size-5" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-100 py-0 text-[10px] font-bold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-300">
                  TRỰC TIẾP LÚC 09:30
                </Badge>
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  Tiết 3-4: Ngữ pháp ứng dụng N3
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tanaka Sensei • Phòng N3-A (Chuẩn bị giáo trình Somatome bài
                18-19).
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-slate-500">
                <span className="font-semibold text-red-600 dark:text-red-400">
                  Bắt đầu sau 45 phút
                </span>
                <span>•</span>
                <span>Điểm danh qua QR</span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            className="h-9 w-full shrink-0 rounded-lg bg-slate-900 px-4 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 sm:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-700"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <span>Xem phòng học</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Task 3: Listening Drill */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition-colors hover:border-slate-200 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/10">
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
              <Headphones className="size-5" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                Luyện nghe phản xạ: Hội thoại công sở (Task-based)
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                3 đoạn trích xuất 2 phút từ đề thi mô phỏng mới nhất.
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-slate-500">
                <span>0/3 đã hoàn tất</span>
                <span>•</span>
                <span>~6 phút</span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="h-9 w-full shrink-0 rounded-lg bg-indigo-100/70 px-4 text-xs font-semibold text-slate-900 hover:bg-indigo-100 sm:w-auto dark:bg-slate-800 dark:text-slate-200"
            asChild
          >
            <Link href="/dashboard">Luyện nghe</Link>
          </Button>
        </div>

        {/* Task 4: Grammar Focus Micro-Quiz */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition-colors hover:border-slate-200 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/10">
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
              <BookOpen className="size-5" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                Quiz chẩn đoán: Cặp cấu trúc phủ định
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Phân biệt{' '}
                <code className="rounded bg-indigo-100 px-1 py-0.5 font-semibold text-slate-900 dark:bg-slate-800 dark:text-indigo-300">
                  〜わけではない
                </code>{' '}
                và{' '}
                <code className="rounded bg-indigo-100 px-1 py-0.5 font-semibold text-slate-900 dark:bg-slate-800 dark:text-indigo-300">
                  〜はずがない
                </code>
                .
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-slate-500">
                <span>6 câu hỏi nhanh</span>
                <span>•</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Tăng 15% độ chính xác
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="h-9 w-full shrink-0 rounded-lg bg-indigo-100/70 px-4 text-xs font-semibold text-slate-900 hover:bg-indigo-100 sm:w-auto dark:bg-slate-800 dark:text-slate-200"
            asChild
          >
            <Link href="/dashboard">Vào thi thử</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
