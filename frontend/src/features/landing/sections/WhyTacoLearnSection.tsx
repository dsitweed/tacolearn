import { BookOpen, BrainCircuit, LineChart, Sparkles } from 'lucide-react';

import { Badge, Card, Progress } from '@/components/ui';

export function WhyTacoLearnSection() {
  const pillars = [
    {
      id: 'pillar-1',
      tag: 'TRỤ CỘT 01',
      icon: BookOpen,
      title: 'Học có cấu trúc tại lớp',
      description:
        'Đồng bộ tức thời bài giảng giáo viên, slide giáo trình và ghi chú lớp học trực tuyến. Không bao giờ bị lệch chuẩn kiến thức giữa sách vở và app điện thoại.',
      cardSnippet: {
        badge: '🟢 Đang học tại lớp',
        text: 'Bài 32: Phán đoán 〜でしょう và 〜かもしれません kèm phát âm bản xứ.',
      },
    },
    {
      id: 'pillar-2',
      tag: 'TRỤ CỘT 02',
      icon: BrainCircuit,
      title: 'Ghi nhớ tự động bằng SRS',
      description:
        'Thuật toán Spaced Repetition thông minh phân bổ thẻ từ vựng & ngữ pháp tự động ngay sau giờ học, hoàn toàn không cần học viên tự tạo flashcard thủ công.',
      progress: 85,
      progressLabel: 'Tiến độ lặp lại: 85% thẻ đã vào trí nhớ dài hạn',
    },
    {
      id: 'pillar-3',
      tag: 'TRỤ CỘT 03',
      icon: LineChart,
      title: 'Hiểu rõ điểm yếu cá nhân',
      description:
        'AI phân tích chính xác lỗi sai qua bài quiz (ví dụ: nhầm lẫn 〜わけではない vs 〜はずがない) và đề xuất gói bài luyện micro-learning 15 phút tập trung.',
      cardSnippet: {
        badge: '🎯 Khuyến nghị AI',
        text: 'Tập trung 14 câu trắc nghiệm phân biệt cấu trúc tương đồng trước kỳ thi.',
      },
    },
  ];

  return (
    <section
      id="features"
      className="bg-white py-16 lg:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <Badge
            variant="outline"
            size="lg"
            className="rounded-full border-[#C6C6CF] bg-[#F0F3FF] px-3 py-1 text-xs font-semibold text-[#081534] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            TẠI SAO CHỌN TACO LEARN
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#081534] sm:text-4xl dark:text-white">
            Ba trụ cột đột phá nâng tầm chất lượng đào tạo Tiếng Nhật
          </h2>
          <p className="text-base text-[#45464E] dark:text-slate-400">
            Kết hợp phương pháp sư phạm chuẩn hóa trên lớp với công nghệ ghi nhớ
            thông minh.
          </p>
        </div>

        {/* 3 Columns Bento Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isPillar1 = pillar.id === 'pillar-1';
            const isPillar2 = pillar.id === 'pillar-2';
            const iconBg = isPillar1
              ? 'bg-[#081534] text-white'
              : isPillar2
                ? 'bg-[#006C4A] text-white'
                : 'bg-[#EE6B09] text-white';
            const tagColor = isPillar1
              ? 'text-[#081534] dark:text-indigo-400'
              : isPillar2
                ? 'text-[#006C4A] dark:text-emerald-400'
                : 'text-[#EE6B09] dark:text-amber-400';

            return (
              <Card
                key={pillar.id}
                className="relative flex flex-col justify-between overflow-hidden border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="space-y-4">
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl ${iconBg} shadow-xs`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span
                      className={`text-xs font-bold tracking-widest ${tagColor}`}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-[#081534] dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#45464E] dark:text-slate-300">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Graphic Snippet */}
                <div className="mt-8 border-t border-slate-100 pt-4 dark:border-slate-800">
                  {pillar.progress ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-[#45464E] dark:text-slate-400">
                        <span>{pillar.progressLabel}</span>
                        <span className="font-bold text-[#006C4A] dark:text-emerald-400">
                          {pillar.progress}%
                        </span>
                      </div>
                      <Progress
                        value={pillar.progress}
                        className="h-2 bg-[#DEE8FF] dark:bg-slate-800 [&>div]:bg-[#006C4A]"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1 rounded-lg border border-slate-200/80 bg-[#F0F3FF] p-3 text-xs shadow-xs dark:border-slate-800 dark:bg-slate-950">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#006C4A] dark:text-emerald-400">
                        <Sparkles className="size-3.5" />
                        {pillar.cardSnippet?.badge}
                      </div>
                      <p className="font-medium text-[#111C2D] dark:text-slate-300">
                        {pillar.cardSnippet?.text}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
