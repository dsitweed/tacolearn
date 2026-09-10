import Link from 'next/link';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

export function JlptPathsSection() {
  const levels = [
    {
      level: 'N5',
      name: 'Nhập môn',
      badge: 'Căn bản',
      desc: 'Xây nền tảng bảng chữ cái Hiragana, Katakana và giao tiếp căn bản hàng ngày.',
      vocab: '800 từ',
      grammar: '80 mẫu',
      kanji: '100 chữ',
      duration: '2-3 tháng',
      highlighted: false,
    },
    {
      level: 'N4',
      name: 'Sơ cấp',
      badge: 'Tiếp nối',
      desc: 'Nắm vững các câu ghép phức tạp và khả năng đọc hiểu hội thoại đời sống thường nhật.',
      vocab: '1,500 từ',
      grammar: '150 mẫu',
      kanji: '300 chữ',
      duration: '3-4 tháng',
      highlighted: false,
    },
    {
      level: 'N3',
      name: 'Trung cấp (Highlight)',
      badge: '🔥 Phổ biến nhất',
      desc: 'Bước ngoặt để ứng tuyển công ty Nhật hoặc nộp hồ sơ du học chuyên ngành.',
      vocab: '3,000 từ',
      grammar: '250 mẫu',
      kanji: '650 chữ',
      duration: '4-5 tháng',
      highlighted: true,
    },
    {
      level: 'N2',
      name: 'Trung thượng cấp',
      badge: 'Đi làm',
      desc: 'Làm việc trong môi trường doanh nghiệp Nhật, đọc hiểu báo chí & xã luận chuyên sâu.',
      vocab: '6,000 từ',
      grammar: '400 mẫu',
      kanji: '1,000 chữ',
      duration: '5-6 tháng',
      highlighted: false,
    },
    {
      level: 'N1',
      name: 'Thượng cấp',
      badge: 'Bậc thầy',
      desc: 'Bậc thầy ngôn ngữ, nghiên cứu học thuật, dịch thuật và đàm phán cấp điều hành.',
      vocab: '10,000 từ',
      grammar: '600 mẫu',
      kanji: '2,000 chữ',
      duration: '6-8 tháng',
      highlighted: false,
    },
  ];

  return (
    <section
      id="jlpt-paths"
      className="bg-white py-16 lg:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <Badge
              variant="outline"
              className="bg-surface-container-low text-primary rounded-full border-slate-300 px-3 py-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              LỘ TRÌNH CHUẨN HÓA
            </Badge>
            <h2 className="text-primary text-3xl font-extrabold tracking-tight sm:text-4xl dark:text-white">
              Lộ trình luyện thi JLPT toàn diện từ N5 đến N1
            </h2>
            <p className="text-on-surface-variant text-base dark:text-slate-400">
              Bộ thẻ SRS và kho bài tập chuẩn hóa bám sát cấu trúc đề thi mới
              nhất.
            </p>
          </div>

          <Badge
            variant="secondary"
            className="bg-surface-container-high text-primary px-3 py-1.5 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200"
          >
            Cập nhật đề thi năm {new Date().getFullYear()}
          </Badge>
        </div>

        {/* 5 Level Cards Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {levels.map((item) => (
            <Card
              key={item.level}
              className={`relative flex flex-col justify-between transition-all duration-200 ${
                item.highlighted
                  ? 'border-secondary from-secondary-container/15 scale-105 border-2 bg-gradient-to-b to-white shadow-xl shadow-emerald-950/10 dark:border-emerald-500 dark:from-slate-900 dark:to-slate-950'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              {item.highlighted && (
                <div className="bg-secondary absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[11px] font-bold text-white shadow-md">
                  HOTTEST COHORT
                </div>
              )}

              <div>
                <CardHeader className="pb-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-primary text-2xl font-extrabold dark:text-white">
                      {item.level}
                    </span>
                    <Badge
                      variant={item.highlighted ? 'default' : 'secondary'}
                      className={`text-[10px] ${
                        item.highlighted
                          ? 'bg-secondary text-white hover:opacity-90'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-on-surface-variant text-sm font-semibold dark:text-slate-400">
                    JLPT {item.level}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 text-xs">
                  <p className="min-h-12 leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Từ vựng:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.vocab}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ngữ pháp:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.grammar}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kanji:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.kanji}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Thời gian:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-2 pb-5">
                <Button
                  className={`w-full text-xs font-semibold ${
                    item.highlighted
                      ? 'bg-secondary text-white shadow-md hover:opacity-90'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                  asChild
                >
                  <Link href="/register">Khám phá {item.level}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
