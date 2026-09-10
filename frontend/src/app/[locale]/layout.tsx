import '../globals.css';

import { getHTMLTextDir } from 'intlayer';
import type { Metadata } from 'next';
import {
  Geist_Mono,
  Inter,
  Noto_Sans_JP,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import { NextLayoutIntlayer } from 'next-intlayer';

import { AppProvider } from '@/components/providers';
export { generateStaticParams } from 'next-intlayer';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'vietnamese'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin', 'vietnamese'],
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-japanese',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TacoLearn - Đồng bộ Bài giảng & Trí nhớ dài hạn',
  description:
    'Nền tảng SaaS EdTech học Tiếng Nhật đồng bộ bài giảng lớp học với Lặp lại ngắt quãng (SRS) và Phân tích điểm yếu thời gian thực.',
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${plusJakartaSans.variable} ${notoSansJP.variable} ${geistMono.variable} h-full antialiased`}
      dir={getHTMLTextDir(locale)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-full font-sans">
        <AppProvider locale={locale}>
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
