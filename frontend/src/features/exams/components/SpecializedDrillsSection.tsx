import { ArrowRight, BookOpen, Mic, SpellCheck } from 'lucide-react';
import Link from 'next/link';

import { Button, Card } from '@/components/ui';

export function SpecializedDrillsSection() {
  const drills = [
    {
      id: 'd1',
      tag: 'ĐỌC HIỂU DẠNG 2 & 3',
      icon: BookOpen,
      title: 'Trung Văn & Trường Văn: Quan Điểm Tác Giả & Tương Phản',
      desc: 'Luyện bóc tách cấu trúc lập luận, từ nối chuyển ý (~しかし, ~どころか) và phát hiện mấu chốt đoạn kết.',
      questions: '10 câu hỏi',
      time: '15 phút',
      level: 'N2 Khá',
      btnText: 'Bắt đầu làm bài',
      btnClass:
        'bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary dark:bg-slate-800 dark:text-white',
    },
    {
      id: 'd2',
      tag: 'NGỮ PHÁP N2',
      icon: SpellCheck,
      title: '50 Cặp Ngữ Pháp N2 Dễ Nhầm Lẫn Trong Đề Thi Thật',
      desc: 'Ghi chú phân biệt rõ ngữ cảnh trang trọng, văn viết và các trường hợp ngoại lệ thường gặp ở Mondai 7 & 8.',
      questions: '20 câu hỏi',
      time: '20 phút',
      level: 'Có ghi chú sắc thái',
      btnText: 'Bắt đầu làm bài',
      btnClass:
        'bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary dark:bg-slate-800 dark:text-white',
    },
    {
      id: 'd3',
      tag: 'NGHE HIỂU DẠNG 4',
      icon: Mic,
      title: 'Nghe Hiểu N2: Phản Xạ Nhanh & Ứng Đáp Tức Thì (即時応答)',
      desc: 'Rèn luyện khả năng chọn đáp án trong 2 giây sau khi nghe câu thoại giao tiếp kinh doanh và đời sống.',
      questions: '12 câu chuẩn phòng thu',
      time: '12 phút',
      level: 'Tokyo Accent',
      btnText: 'Luyện nghe ngay',
      btnClass:
        'bg-surface-container-low hover:bg-secondary hover:text-on-secondary text-primary dark:bg-slate-800 dark:text-white',
    },
  ];

  return (
    <section className="flex flex-col space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-secondary h-6 w-2.5 rounded-full" />
          <div>
            <h3 className="font-heading text-primary text-lg font-bold tracking-tight sm:text-xl dark:text-white">
              Luyện Theo Chuyên Đề & Dạng Bài (Specialized Drills)
            </h3>
            <p className="text-on-surface-variant text-xs">
              Tập trung giải quyết triệt để từng kỹ năng nhỏ theo dạng câu hỏi
              JLPT
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/exams"
          className="text-secondary flex items-center gap-1 text-xs font-semibold hover:underline dark:text-emerald-400"
        >
          <span>Khám phá 64 chuyên đề</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* 3 Drill Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {drills.map((drill) => {
          const Icon = drill.icon;
          return (
            <Card
              key={drill.id}
              className="bg-surface-container-lowest group flex flex-col justify-between space-y-4 rounded-2xl border-slate-100 p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant bg-surface-container rounded px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase dark:bg-slate-800 dark:text-slate-300">
                    {drill.tag}
                  </span>
                  <Icon className="text-secondary size-4 dark:text-emerald-400" />
                </div>

                <h4 className="font-heading text-primary group-hover:text-secondary text-base leading-snug font-bold transition-colors dark:text-white dark:group-hover:text-emerald-400">
                  {drill.title}
                </h4>

                <p className="text-on-surface-variant text-xs leading-relaxed">
                  {drill.desc}
                </p>

                <div className="text-on-surface-variant flex flex-wrap gap-1.5 pt-1 text-xs">
                  <span className="bg-surface-container-low rounded px-2 py-0.5 text-[11px] dark:bg-slate-800 dark:text-slate-300">
                    {drill.questions}
                  </span>
                  <span className="bg-surface-container-low rounded px-2 py-0.5 text-[11px] dark:bg-slate-800 dark:text-slate-300">
                    {drill.time}
                  </span>
                  <span className="bg-surface-container-low rounded px-2 py-0.5 text-[11px] dark:bg-slate-800 dark:text-slate-300">
                    {drill.level}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className={`h-9 w-full rounded-xl border-none py-2 text-xs font-semibold transition-all ${drill.btnClass}`}
                >
                  {drill.btnText}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
