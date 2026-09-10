import { Layers, Link2, RotateCcw } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button, Card } from '@/components/ui';

export function SyncedSrsQueueCard() {
  const extractedVocabs = [
    {
      kanji: '曖昧',
      reading: 'あいまい',
      meaning: 'Mơ hồ, nhập nhằng',
    },
    {
      kanji: '促す',
      reading: 'うながす',
      meaning: 'Thúc đẩy, khuyến khích',
    },
    {
      kanji: '尊重',
      reading: 'そんちょう',
      meaning: 'Tôn trọng',
    },
  ];

  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-4 rounded-2xl border-slate-100 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-secondary-container text-on-secondary-container flex size-9 items-center justify-center rounded-xl">
            <RotateCcw className="size-4.5" />
          </div>
          <div>
            <h3 className="font-heading text-primary text-base font-bold dark:text-white">
              Đã nạp vào SRS
            </h3>
            <span className="text-secondary text-[11px] font-semibold dark:text-emerald-400">
              Live SRS Sync kích hoạt
            </span>
          </div>
        </div>

        <Badge className="bg-secondary text-on-secondary rounded-full border-none px-2.5 py-0.5 text-xs font-bold">
          5 mục
        </Badge>
      </div>

      <p className="text-on-surface-variant text-xs leading-relaxed">
        Hệ thống tự động trích xuất các từ vựng và cấu trúc ngữ pháp trọng yếu
        trong đề thi bạn vừa làm sai để đưa vào hàng đợi ôn tập ngắt quãng.
      </p>

      {/* Vocabulary Section */}
      <div className="flex flex-col gap-2 pt-1">
        <span className="text-on-surface-variant text-[10px] font-bold tracking-wider uppercase">
          TỪ VỰNG N2 TRÍCH XUẤT (3)
        </span>

        {extractedVocabs.map((v) => (
          <div
            key={v.kanji}
            className="bg-surface-container-low hover:bg-surface-container flex items-center justify-between rounded-xl p-2.5 transition-colors dark:bg-slate-800/40"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-base font-bold dark:text-white">
                {v.kanji}
              </span>
              <span className="text-on-surface-variant text-xs">
                {v.reading} · {v.meaning}
              </span>
            </div>

            <Badge className="bg-surface-container text-primary border-none px-2 py-0 text-[10px] font-medium dark:bg-slate-700 dark:text-slate-200">
              SRS Hôm nay
            </Badge>
          </div>
        ))}
      </div>

      {/* Grammar Section */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-1 dark:border-slate-800">
        <span className="text-on-surface-variant text-[10px] font-bold tracking-wider uppercase">
          NGỮ PHÁP LIÊN ĐỚI (2)
        </span>

        <div className="bg-surface-container-low space-y-1 rounded-xl p-3 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs">
            <span className="text-primary font-bold dark:text-white">
              〜わけではない
            </span>
            <Badge className="bg-surface-container text-on-surface-variant border-none px-2 py-0 text-[10px] dark:bg-slate-700">
              N2 Ngữ pháp
            </Badge>
          </div>
          <p className="text-on-surface-variant text-xs">
            Không hẳn là, không có nghĩa là...
          </p>
          <div className="text-secondary flex items-center gap-1 pt-0.5 text-[11px] font-medium dark:text-emerald-400">
            <Link2 className="size-3" />
            <span>Bài học Buổi 18 Tanaka Sensei</span>
          </div>
        </div>

        <div className="bg-surface-container-low space-y-1 rounded-xl p-3 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs">
            <span className="text-primary font-bold dark:text-white">
              〜というより
            </span>
            <Badge className="bg-surface-container text-on-surface-variant border-none px-2 py-0 text-[10px] dark:bg-slate-700">
              N2 Ngữ pháp
            </Badge>
          </div>
          <p className="text-on-surface-variant text-xs">
            Đúng hơn là, thay vì nói là...
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        className="bg-surface-container text-primary hover:bg-surface-container-high mt-1 flex h-9 w-full items-center justify-center gap-2 rounded-xl border-none text-xs font-semibold transition-colors dark:bg-slate-800 dark:text-slate-200"
        asChild
      >
        <Link href="/dashboard/srs-review">
          <Layers className="size-4" />
          <span>Mở thẻ SRS ôn tập ngay (5 mục)</span>
        </Link>
      </Button>
    </Card>
  );
}
