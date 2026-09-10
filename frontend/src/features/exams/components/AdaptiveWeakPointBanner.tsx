import {
  AlertTriangle,
  Headphones,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Verified,
  Zap,
} from 'lucide-react';

import { Badge, Button, Progress } from '@/components/ui';

interface AdaptiveWeakPointBannerProps {
  onStartAdaptivePractice: () => void;
  onCustomizeSession: () => void;
}

export function AdaptiveWeakPointBanner({
  onStartAdaptivePractice,
  onCustomizeSession,
}: AdaptiveWeakPointBannerProps) {
  return (
    <div className="bg-primary text-on-primary relative overflow-hidden rounded-2xl p-6 shadow-xl sm:p-8">
      {/* Ambient Japanese Geometry / Glow Deco */}
      <div className="bg-secondary/20 pointer-events-none absolute -top-24 -right-16 size-96 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute right-12 bottom-0 text-[180px] leading-none font-medium text-white/5 select-none">
        克服
      </div>

      <div className="relative z-10 flex flex-col space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="bg-secondary-container/20 text-secondary-fixed inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold backdrop-blur-md">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>Được đề xuất riêng cho bạn · AI Diagnostic Engine</span>
          </div>

          <div className="text-surface-dim flex items-center gap-1.5 font-medium">
            <Verified className="text-secondary-fixed size-4" />
            <span>Đã phân tích từ 142 lượt nộp gần nhất</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="max-w-3xl space-y-2">
          <h2 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
            Chế độ Luyện Thích Ứng Theo Điểm Yếu (Adaptive Practice)
          </h2>
          <p className="text-surface-container-highest text-xs leading-relaxed sm:text-sm">
            Thuật toán Taco AI đã phát hiện 3 vùng kiến thức có tỉ lệ sai vượt
            mức cho phép. Hoàn thành phiên bù khuyết điểm nhanh dưới 15 phút để
            đưa dự báo điểm JLPT N2 đạt ngưỡng an toàn (≥ 120/180).
          </p>
        </div>

        {/* 3 Weak Point Metric Cards */}
        <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
          {/* Card 1: Dokkai Opinion */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/15">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-dim text-[11px] font-bold tracking-wider uppercase">
                  Đọc hiểu · 読解
                </span>
                <Badge className="bg-error/30 text-error-container flex items-center gap-1 rounded border-none px-2 py-0.5 text-[10px] font-bold">
                  <span className="bg-error size-1.5 rounded-full" />
                  Báo động đỏ
                </Badge>
              </div>

              <h4 className="font-heading text-base font-bold text-white">
                Quan điểm tác giả
              </h4>
              <p className="text-surface-dim text-xs leading-snug">
                Dạng bài trung văn & bình luận xã hội
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-surface-container-highest">
                  Độ chính xác
                </span>
                <span className="font-heading text-error-container text-lg font-bold">
                  48%
                </span>
              </div>

              <Progress
                value={48}
                className="[&>div]:bg-error h-1.5 bg-white/20"
              />

              <div className="text-surface-dim flex items-center gap-1.5 pt-1 text-[11px]">
                <AlertTriangle className="text-error-container size-3.5" />
                <span>8 câu sai tích luỹ trong 7 ngày qua</span>
              </div>
            </div>
          </div>

          {/* Card 2: Choukai Intention */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/15">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-dim text-[11px] font-bold tracking-wider uppercase">
                  Nghe hiểu · 聴解
                </span>
                <Badge className="bg-tertiary-container/80 text-tertiary-fixed rounded border-none px-2 py-0.5 text-[10px] font-bold">
                  Cần cải thiện
                </Badge>
              </div>

              <h4 className="font-heading text-base font-bold text-white">
                Ý định người nói
              </h4>
              <p className="text-surface-dim text-xs leading-snug">
                Phản xạ câu hỏi bẫy ngữ điệu cuối câu
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-surface-container-highest">
                  Độ chính xác
                </span>
                <span className="font-heading text-tertiary-fixed text-lg font-bold">
                  58%
                </span>
              </div>

              <Progress
                value={58}
                className="[&>div]:bg-tertiary-fixed h-1.5 bg-white/20"
              />

              <div className="text-surface-dim flex items-center gap-1.5 pt-1 text-[11px]">
                <Headphones className="text-tertiary-fixed size-3.5" />
                <span>5 đoạn hội thoại cần nghe lại ngay</span>
              </div>
            </div>
          </div>

          {/* Card 3: Bunpou Grammar Pairs */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/15">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-dim text-[11px] font-bold tracking-wider uppercase">
                  Ngữ pháp · 文法
                </span>
                <Badge className="bg-secondary/30 text-secondary-fixed rounded border-none px-2 py-0.5 text-[10px] font-bold">
                  Đang phục hồi
                </Badge>
              </div>

              <h4 className="font-heading text-base font-bold text-white">
                Cấu trúc tương đồng N2
              </h4>
              <p className="text-surface-dim text-xs leading-snug">
                Phân biệt ~に際して vs ~にあたって
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-surface-container-highest">
                  Độ chính xác
                </span>
                <span className="font-heading text-secondary-fixed text-lg font-bold">
                  64%
                </span>
              </div>

              <Progress
                value={64}
                className="[&>div]:bg-secondary-fixed h-1.5 bg-white/20"
              />

              <div className="text-surface-dim flex items-center gap-1.5 pt-1 text-[11px]">
                <Ruler className="text-secondary-fixed size-3.5" />
                <span>12 mẫu cấu trúc phán đoán dễ nhầm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action & Trust Proof */}
        <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={onStartAdaptivePractice}
              className="bg-secondary text-on-secondary flex h-11 items-center gap-2 rounded-xl px-6 text-xs font-bold shadow-lg transition-all hover:opacity-90 active:scale-95 sm:text-sm"
            >
              <Zap className="size-4.5 fill-current" />
              <span>
                Bắt đầu luyện tập điểm yếu ngay (15 phút · 10 câu chọn lọc)
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onCustomizeSession}
              className="flex h-11 items-center gap-1.5 rounded-xl border-none bg-white/15 px-4 text-xs font-semibold text-white transition-all hover:bg-white/25 sm:text-sm"
            >
              <SlidersHorizontal className="size-4" />
              <span>Tùy biến phiên luyện thích ứng</span>
            </Button>
          </div>

          <div className="text-surface-dim flex items-center gap-2 text-xs">
            <TrendingUp className="text-secondary-fixed size-4 shrink-0" />
            <span>
              <strong className="text-white">92%</strong> học viên tăng 15–25
              điểm Dokkai sau 14 ngày duy trì 15p/ngày.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
