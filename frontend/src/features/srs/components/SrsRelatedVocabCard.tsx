import { ArrowRight, ArrowRightLeft } from 'lucide-react';

import { Card } from '@/components/ui';

export function SrsRelatedVocabCard() {
  const relatedList = [
    {
      kanji: '明確',
      reading: 'めいかく',
      badge: 'Đối nghĩa',
      badgeClass:
        'bg-secondary/15 text-secondary dark:bg-emerald-950 dark:text-emerald-300',
      meaning: 'Rõ ràng, minh bạch, cụ thể',
    },
    {
      kanji: '曖昧模糊',
      reading: 'あいまいもこ',
      badge: 'Thành ngữ',
      badgeClass:
        'bg-surface-container text-on-surface-variant dark:bg-slate-800 dark:text-slate-300',
      meaning: 'Thành ngữ 4 chữ: Mơ hồ hỗn tạp',
    },
    {
      kanji: '否定',
      reading: 'ひてい',
      badge: 'Liên quan',
      badgeClass:
        'bg-surface-container text-on-surface-variant dark:bg-slate-800 dark:text-slate-300',
      meaning: 'Phủ định (ngữ pháp ~わけではない)',
    },
  ];

  return (
    <Card className="bg-surface-container-lowest rounded-xl border-slate-100 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between text-xs">
        <div className="text-on-surface flex items-center gap-2 font-bold dark:text-slate-200">
          <ArrowRightLeft className="text-primary size-4 dark:text-indigo-400" />
          <span>Thẻ liên quan & Cặp từ đối lập</span>
        </div>
        <span className="text-outline text-[11px] font-semibold">N3 Vocab</span>
      </div>

      <div className="flex flex-col gap-2">
        {relatedList.map((item) => (
          <div
            key={item.kanji}
            className="bg-surface-container-low hover:bg-surface-container group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors dark:bg-slate-800/40 dark:hover:bg-slate-800"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-primary text-base font-bold dark:text-white">
                  {item.kanji}
                </span>
                <span className="text-secondary text-xs font-semibold dark:text-emerald-400">
                  {item.reading}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${item.badgeClass}`}
                >
                  {item.badge}
                </span>
              </div>
              <span className="text-on-surface-variant mt-0.5 text-xs">
                {item.meaning}
              </span>
            </div>

            <ArrowRight className="text-outline group-hover:text-primary size-4 transition-all group-hover:translate-x-0.5 dark:group-hover:text-white" />
          </div>
        ))}
      </div>
    </Card>
  );
}
