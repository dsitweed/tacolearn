'use client';

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useState } from 'react';

import { Badge, Button, Card, Progress } from '@/components/ui';

export function HeroMockup() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-slate-200/80 bg-slate-900/90 p-3 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl sm:p-5 dark:border-slate-800">
      {/* Top Header Bar */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-md">
            東
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">
                Lớp N3 Cấp tốc - N3-K24
              </h3>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-[11px] text-emerald-400"
              >
                🟢 Trực tuyến
              </Badge>
            </div>
            <p className="text-xs text-slate-400">
              Chương trình JLPT N3 Tăng tốc • Đang mở: Bài 32 (Cấu trúc phán
              đoán)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge
            variant="secondary"
            className="border-slate-700 bg-slate-800 text-slate-300"
          >
            🔥 Chuỗi: 14 ngày
          </Badge>
          <Badge
            variant="secondary"
            className="border-indigo-800 bg-indigo-950 text-indigo-300"
          >
            ⚡ Đồng bộ tự động
          </Badge>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left Column: Interactive Flashcard Shell (7 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Card className="border-slate-800 bg-slate-950/80 p-5 text-white shadow-inner">
            {/* Flashcard Header */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-indigo-400">
                <Sparkles className="size-3.5" />
                SRS Flashcard Mode (Tacomori Algo)
              </span>
              <Badge
                variant="outline"
                className="border-slate-700 bg-slate-900 text-[10px] text-slate-300"
              >
                Thẻ 15 / 25
              </Badge>
            </div>

            {/* Kanji Focus Area */}
            <div className="flex flex-col items-center justify-center space-y-3 rounded-xl border border-slate-800/60 bg-gradient-to-b from-slate-900/50 to-slate-950 p-4 py-6 text-center">
              <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
                KANJI & TỪ VỰNG N3
              </span>

              <div
                className="group relative cursor-pointer"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <h2 className="text-5xl font-extrabold tracking-wider text-white transition-colors hover:text-indigo-300">
                  判断
                </h2>
                <span className="absolute -top-1 -right-6 flex size-5 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white">
                  <Volume2 className="size-3" />
                </span>
              </div>

              <p className="text-sm font-medium text-slate-300">
                はんだん (Handan)
              </p>

              {showAnswer ? (
                <div className="animate-in fade-in space-y-2 pt-2 duration-200">
                  <Badge className="border-emerald-500/30 bg-emerald-500/20 text-xs text-emerald-300">
                    Ý nghĩa: Phán đoán, quyết định
                  </Badge>
                  <p className="text-xs text-slate-400 italic">
                    &quot;正しい判断を下す (Đưa ra phán đoán đúng đắn)&quot;
                  </p>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAnswer(true)}
                  className="mt-2 border-slate-700 bg-slate-900/80 text-xs text-slate-300 hover:bg-indigo-600 hover:text-white"
                >
                  [Click hoặc phím Space để xem đáp án]
                </Button>
              )}
            </div>

            {/* Keyboard Shortcuts Bottom Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-[11px]">
              <span className="font-medium text-slate-400">
                Đánh giá độ nhớ:
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 bg-red-950/40 px-2 text-[11px] text-red-400 hover:bg-red-900/60"
                >
                  [1] Quên (1m)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 bg-amber-950/40 px-2 text-[11px] text-amber-400 hover:bg-amber-900/60"
                >
                  [2] Khó (10m)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 bg-indigo-950/40 px-2 text-[11px] text-indigo-300 hover:bg-indigo-900/60"
                >
                  [3] Tốt (1d)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 bg-emerald-950/40 px-2 text-[11px] text-emerald-400 hover:bg-emerald-900/60"
                >
                  [4] Dễ (4d)
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Snapshot Alert Banner */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-amber-200">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-400" />
            <div className="flex-1 space-y-1 text-xs">
              <div className="font-semibold text-amber-300">
                Phát hiện điểm yếu: Nhầm lẫn cặp ngữ pháp
              </div>
              <p className="text-[11px] text-slate-300">
                Độ chính xác: 42% khi phân biệt giữa{' '}
                <code className="rounded bg-amber-950/60 px-1 text-amber-200">
                  〜わけではない
                </code>{' '}
                và{' '}
                <code className="rounded bg-amber-950/60 px-1 text-amber-200">
                  〜はずがない
                </code>
                .
              </p>
            </div>
            <Button
              size="sm"
              className="h-8 shrink-0 bg-amber-600 px-3 text-xs text-white hover:bg-amber-700"
            >
              Ôn ngay 5m
            </Button>
          </div>
        </div>

        {/* Right Column: Metrics & Health (5 Cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Metric Card 1: JLPT N3 Mastery */}
          <Card className="space-y-3 border-slate-800 bg-slate-950/80 p-4 text-white">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">
                Tiến độ làm chủ JLPT N3
              </span>
              <span className="text-sm font-bold text-indigo-400">64%</span>
            </div>

            <Progress
              value={64}
              className="h-2 bg-slate-800 [&>div]:bg-indigo-500"
            />

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                <span className="block text-[10px] text-slate-400">
                  Từ vựng
                </span>
                <span className="font-bold text-slate-200">850/1000</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                <span className="block text-[10px] text-slate-400">
                  Ngữ pháp
                </span>
                <span className="font-bold text-slate-200">120/150</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                <span className="block text-[10px] text-slate-400">Kanji</span>
                <span className="font-bold text-slate-200">350/650</span>
              </div>
            </div>
          </Card>

          {/* Metric Card 2: Attendance & Health */}
          <Card className="space-y-3 border-slate-800 bg-slate-950/80 p-4 text-white">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Điểm chuyên cần SRS Lớp N3-K24
              </span>
              <Badge className="border-emerald-500/30 bg-emerald-500/20 text-[10px] text-emerald-400">
                Xuất sắc
              </Badge>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="relative flex size-14 items-center justify-center rounded-full border-4 border-indigo-500 border-t-emerald-400 bg-slate-900 text-sm font-bold text-white">
                94%
              </div>
              <div className="space-y-0.5 text-xs">
                <p className="font-medium text-slate-200">
                  28/28 Học viên tham gia
                </p>
                <p className="text-[11px] text-slate-400">
                  94% hoàn thành bài ôn SRS đúng hạn trong 24h.
                </p>
              </div>
            </div>
          </Card>

          {/* Sync Footer Badge */}
          <div className="flex items-center justify-between rounded-xl border border-indigo-900/40 bg-indigo-950/30 p-3 text-xs text-indigo-300">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-indigo-400" />
              Tự động đồng bộ từ Slide giảng dạy
            </span>
            <span className="text-[10px] text-slate-400">Vừa cập nhật</span>
          </div>
        </div>
      </div>
    </div>
  );
}
