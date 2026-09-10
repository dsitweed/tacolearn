import Link from 'next/link';

import { Separator } from '@/components/ui';

import { TacoLearnLogo } from '../components/TacoLearnLogo';

export function LandingFooter() {
  const footerSections = [
    {
      title: 'Khóa học JLPT',
      links: [
        { label: 'N5 - N4 Nhập môn', href: '#jlpt-paths' },
        { label: 'N3 Tăng tốc', href: '#jlpt-paths' },
        { label: 'N2 Chuyên sâu', href: '#jlpt-paths' },
        { label: 'N1 Thượng cấp', href: '#jlpt-paths' },
      ],
    },
    {
      title: 'Giải pháp',
      links: [
        { label: 'Thuật toán SRS Tacomori', href: '#features' },
        { label: 'Dành cho Trường Nhật Ngữ', href: '#for-schools' },
        { label: 'Phân tích tiến độ học viên', href: '#for-schools' },
        { label: 'Giáo trình đồng bộ', href: '#how-it-works' },
      ],
    },
    {
      title: 'Hỗ trợ & Pháp lý',
      links: [
        { label: 'Trung tâm trợ giúp', href: '#' },
        { label: 'Chính sách quyền riêng tư', href: '#' },
        { label: 'Điều khoản dịch vụ', href: '#' },
        { label: 'Cộng đồng học viên Taco', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-4">
            <TacoLearnLogo size="lg" className="[&_span]:text-white" />
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Nền tảng học Tiếng Nhật thông minh đồng bộ bài giảng tại trường
              học với thuật toán Lặp lại Ngắt quãng (Spaced Repetition) và chẩn
              đoán điểm yếu.
            </p>
            <p className="pt-2 text-xs text-slate-500">
              © {new Date().getFullYear()} Taco Learn SaaS. Bản quyền thuộc về
              Taco EdTech.
            </p>
          </div>

          {/* Links Cols */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <p>
            TacoLearn EdTech Platform — Solution for Language Schools &
            Learners.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300">
              Terms
            </a>
            <a href="#" className="hover:text-slate-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
