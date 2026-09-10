import { ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage, Card } from '@/components/ui';

export function TeachersNoteCard() {
  return (
    <Card className="border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
            LƯU Ý TỪ GIÁO VIÊN
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">Hôm qua</span>
      </div>

      {/* Teacher Profile Row */}
      <div className="flex items-center gap-3">
        <Avatar className="size-11 border-2 border-indigo-100 dark:border-slate-700">
          <AvatarImage
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
            alt="Tanaka Sensei"
          />
          <AvatarFallback className="bg-indigo-900 text-xs font-bold text-white">
            TN
          </AvatarFallback>
        </Avatar>

        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Tanaka Sensei
          </h4>
          <p className="text-xs text-slate-500">
            Giáo viên chủ nhiệm lớp N3-K24
          </p>
        </div>
      </div>

      {/* Note Content Box */}
      <div className="bg-surface-container-low relative mt-4 rounded-xl border border-slate-200/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <span className="absolute -top-3 left-4 font-serif text-3xl text-slate-400 select-none dark:text-slate-600">
          “
        </span>
        <div className="text-on-surface space-y-2 text-xs leading-relaxed dark:text-slate-200">
          <p className="italic">
            Minh làm bài test từ vựng rất tốt! Tuy nhiên ở phần ngữ pháp{' '}
            <strong className="font-japanese text-primary font-semibold not-italic dark:text-white">
              〜わけではない
            </strong>{' '}
            và{' '}
            <strong className="font-japanese text-primary font-semibold not-italic dark:text-white">
              〜はずがない
            </strong>
            , em còn nhầm lẫn khi gặp câu phủ định kép.
          </p>
          <p className="text-slate-500 italic">
            Hãy dành 10 phút luyện bộ thẻ tương quan thầy vừa đồng bộ lên hệ
            thống trước khi vào lớp sáng nay nhé!
          </p>
        </div>
      </div>

      {/* Bottom reply/link */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>Đã xác nhận xem</span>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          <span>Nhắn tin cho thầy</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </Card>
  );
}
