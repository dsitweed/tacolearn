import { CheckCircle, Circle, ExternalLink, MoveUp } from 'lucide-react';
import Link from 'next/link';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  Progress,
} from '@/components/ui';

export function ExamSidebarSummary() {
  return (
    <div className="flex flex-col space-y-6">
      {/* CARD 1: WEEKLY EXAM PROGRESS */}
      <Card className="bg-surface-container-lowest space-y-4 rounded-2xl border-slate-100 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-primary text-base font-bold dark:text-white">
            Tiến độ tuần này
          </h4>
          <span className="text-secondary text-xs font-bold dark:text-emerald-400">
            Đạt 66%
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant">
              Mục tiêu: 3 đề / tuần
            </span>
            <span className="text-primary font-bold dark:text-white">
              2 / 3 đề hoàn thành
            </span>
          </div>

          <Progress
            value={66}
            className="bg-surface-container-low [&>div]:bg-secondary h-2"
          />
        </div>

        {/* Weekly mini checklist */}
        <div className="space-y-2 pt-1 text-xs">
          <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-2.5 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-secondary size-4 dark:text-emerald-400" />
              <span className="text-on-surface font-semibold dark:text-slate-200">
                Đề N2 Tháng 12/2022
              </span>
            </div>
            <span className="text-on-surface-variant font-mono text-[11px]">
              112/180
            </span>
          </div>

          <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-2.5 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-secondary size-4 dark:text-emerald-400" />
              <span className="text-on-surface font-semibold dark:text-slate-200">
                Chuyên đề Đọc Dạng 1 & 2
              </span>
            </div>
            <span className="text-on-surface-variant font-mono text-[11px]">
              9/10 câu đúng
            </span>
          </div>

          <div className="bg-surface-container-low/50 flex items-center justify-between rounded-lg p-2.5 dark:bg-slate-800/20">
            <div className="text-on-surface-variant flex items-center gap-2">
              <Circle className="text-outline size-4" />
              <span>Đề Dự đoán số 02 (Chưa làm)</span>
            </div>
            <span className="text-outline text-[11px]">Chờ thi</span>
          </div>
        </div>
      </Card>

      {/* CARD 2: JLPT SCORE PREDICTOR GAUGE */}
      <Card className="bg-surface-container-lowest space-y-4 rounded-2xl border-slate-100 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-primary text-base font-bold dark:text-white">
            Chỉ số dự đoán điểm N2
          </h4>
          <Badge className="bg-secondary-fixed/50 text-on-secondary-fixed-variant rounded-full border-none px-2 py-0.5 text-[10px] font-bold dark:bg-emerald-950 dark:text-emerald-300">
            Dự báo: ĐẬU KHÁ
          </Badge>
        </div>

        {/* Metric Number and Semi-Donut Gauge */}
        <div className="flex items-center gap-4 pt-1">
          {/* Inline SVG Semi-Donut Gauge */}
          <div className="relative flex size-24 shrink-0 items-center justify-center">
            <svg className="size-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-surface-container dark:text-slate-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="65, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-heading text-primary text-lg font-bold dark:text-white">
                118
              </span>
              <span className="text-outline text-[10px]">/ 180</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-secondary flex items-center gap-1 text-xs font-bold dark:text-emerald-400">
              <MoveUp className="size-3.5" />
              <span>+12 điểm</span>
              <span className="text-on-surface-variant font-normal">
                so với tháng trước
              </span>
            </div>
            <p className="text-on-surface-variant text-[11px] leading-relaxed">
              Điểm liệt an toàn (mỗi phân môn &gt; 28/60). Cần tích luỹ thêm 12
              điểm Đọc hiểu để đạt mốc An Tâm (≥ 130).
            </p>
          </div>
        </div>

        {/* Sub Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-surface-container-low rounded-lg p-2 dark:bg-slate-800/40">
            <div className="text-outline-variant text-[10px] font-bold uppercase">
              Moji·Bun
            </div>
            <div className="font-heading text-primary text-sm font-bold dark:text-white">
              42
              <span className="text-outline text-[10px] font-normal">/60</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-2 dark:bg-slate-800/40">
            <div className="text-outline-variant text-[10px] font-bold uppercase">
              Dokkai
            </div>
            <div className="font-heading text-error text-sm font-bold">
              34
              <span className="text-outline text-[10px] font-normal">/60</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-2 dark:bg-slate-800/40">
            <div className="text-outline-variant text-[10px] font-bold uppercase">
              Choukai
            </div>
            <div className="font-heading text-secondary text-sm font-bold dark:text-emerald-400">
              42
              <span className="text-outline text-[10px] font-normal">/60</span>
            </div>
          </div>
        </div>
      </Card>

      {/* CARD 3: SENSEI TANAKA TIME MANAGEMENT NOTE */}
      <Card className="bg-surface-container-high/40 space-y-3 rounded-2xl border-slate-100 p-5 dark:border-slate-800 dark:bg-slate-800/30">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-slate-200 dark:border-slate-700">
            <AvatarImage
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Sensei Tanaka"
            />
            <AvatarFallback className="bg-primary text-xs font-bold text-white">
              TK
            </AvatarFallback>
          </Avatar>

          <div>
            <h5 className="text-primary text-xs font-bold dark:text-white">
              Mẹo làm bài từ Tanaka Sensei
            </h5>
            <span className="text-on-surface-variant text-[11px]">
              Giảng viên trưởng Hội đồng Chuyên môn Taco
            </span>
          </div>
        </div>

        <p className="text-on-surface text-xs leading-relaxed italic dark:text-slate-200">
          &quot;Trong phần Đọc hiểu N2, đừng bao giờ dịch từng câu sang tiếng
          Việt. Hãy khoanh tròn các liên từ chỉ sự tương phản (が、しかし) và
          đọc lướt tìm chủ ngữ chính. Giới hạn nghiêm ngặt 2.5 phút/câu trung
          văn!&quot;
        </p>

        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-secondary text-[11px] font-bold dark:text-emerald-400">
            Chiến thuật thi Dokkai 2024
          </span>
          <Link
            href="/dashboard/exams"
            className="text-primary flex items-center gap-1 text-[11px] font-semibold hover:underline dark:text-indigo-400"
          >
            <span>Đọc cẩm nang 5 mẹo</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
