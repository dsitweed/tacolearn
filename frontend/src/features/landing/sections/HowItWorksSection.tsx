import {
  ArrowRight,
  BookOpen,
  Brain,
  FileSpreadsheet,
  Layers,
  Smartphone,
} from 'lucide-react';

import { Badge, Card } from '@/components/ui';

export function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Lớp học trực tiếp',
      desc: 'Giáo viên giảng bài trực tiếp trên lớp hoặc qua video bài giảng chuẩn hóa theo giáo trình.',
      icon: BookOpen,
    },
    {
      number: '2',
      title: 'Trích xuất cốt lõi',
      desc: 'Hệ thống trích xuất tự động Kanji, Từ vựng, Ngữ pháp trọng tâm được nhấn mạnh trong tiết học.',
      icon: Layers,
    },
    {
      number: '3',
      title: 'Đồng bộ SRS Deck',
      desc: 'Khởi tạo ngay bộ thẻ Spaced Repetition cá nhân hóa trên tài khoản học viên trong 30 giây.',
      icon: Brain,
    },
    {
      number: '4',
      title: 'Ôn tập 5-10 phút',
      desc: 'Học viên lướt thẻ mỗi ngày qua app điện thoại hoặc web vào các khung giờ vàng ghi nhớ.',
      icon: Smartphone,
    },
    {
      number: '5',
      title: 'Báo cáo sức khoẻ',
      desc: 'Báo cáo mức độ thuộc bài và điểm nghẽn tự động gửi về Giáo viên và Nhà trường.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-y border-slate-200/80 bg-slate-50 py-16 lg:py-24 dark:border-slate-800/80 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <Badge
            variant="outline"
            className="rounded-full border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
          >
            QUY TRÌNH HOẠT ĐỘNG
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            5 bước đồng bộ từ Lớp học đến Trí nhớ dài hạn
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Quy trình khép kín giúp học viên không bỏ rơi kiến thức sau khi rời
            lớp học.
          </p>
        </div>

        {/* 5 Horizontal Nodes */}
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className="relative flex flex-col justify-between border-slate-200 bg-white p-5 transition-all hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      0{step.number}
                    </div>
                    <Icon className="size-5 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="size-5 text-indigo-300 dark:text-slate-600" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Feature Interactive Walkthrough Strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 p-6 text-white shadow-xl sm:p-8 md:flex-row">
          <div className="max-w-xl space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              DỄ DÀNG TÍCH HỢP
            </span>
            <h3 className="text-xl font-bold sm:text-2xl">
              Tích hợp thẳng vào chương trình giảng dạy hiện tại
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Không thay đổi giáo trình, không làm gián đoạn tiến trình dạy học.
              Giúp trung tâm tăng tỷ lệ đỗ JLPT lên tới 35%.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <div className="min-w-32 rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
              <span className="block text-2xl font-extrabold text-emerald-400">
                +35%
              </span>
              <span className="text-[11px] text-slate-300">Tỷ lệ đỗ JLPT</span>
            </div>
            <div className="min-w-32 rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
              <span className="block text-2xl font-extrabold text-indigo-300">
                98%
              </span>
              <span className="text-[11px] text-slate-300">
                Học viên hài lòng
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
