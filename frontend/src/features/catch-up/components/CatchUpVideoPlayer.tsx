import { Download, ExternalLink, Play, Subtitles } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
} from '@/components/ui';

export function CatchUpVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDownloadBoard = () => {
    toast.success('Đang tạo và tải xuống bản Board Note PDF (5.2 MB)...');
  };

  const handleFullRecord = () => {
    toast.info('Đang mở bản ghi đầy đủ 90 phút buổi học ngày 10/09.');
  };

  return (
    <Card className="bg-surface-container-lowest flex flex-col overflow-hidden rounded-2xl border-slate-100 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Video Viewport Area */}
      <div className="bg-inverse-surface group relative aspect-video w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&auto=format&fit=crop&q=80"
          alt="Tanaka Sensei writing Japanese grammar structure on whiteboard in Tokyo classroom"
          fill
          className="object-cover object-center opacity-85 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient dark overlay */}
        <div className="from-primary/95 via-primary/40 absolute inset-0 bg-gradient-to-t to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <Badge className="bg-primary-container/85 text-on-primary flex items-center gap-1.5 rounded-full border-none px-2.5 py-1 text-xs backdrop-blur-md">
            <span className="bg-secondary size-2 animate-pulse rounded-full" />
            <span>AI Smart Clip (8m 12s)</span>
          </Badge>

          <Badge className="bg-surface-container-lowest/85 text-primary rounded-full border-none px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
            Full HD 1080p Synced
          </Badge>
        </div>

        <div className="absolute top-4 right-4">
          <Badge className="bg-inverse-surface/85 text-inverse-on-surface rounded-md border-none px-2.5 py-1 text-xs backdrop-blur-md">
            Whiteboard OCR Active
          </Badge>
        </div>

        {/* Centered Play Action Button */}
        <button
          type="button"
          onClick={() => {
            setIsPlaying(!isPlaying);
            toast.info(
              isPlaying
                ? 'Tạm dừng clip học bù'
                : 'Đang phát video tóm tắt 8m 12s',
            );
          }}
          className="bg-surface-container-lowest/90 text-primary hover:bg-surface-container-lowest absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
          aria-label="Phát video tóm tắt"
        >
          <Play className="ml-1 size-8 fill-current" />
        </button>

        {/* Bottom Captions Details */}
        <div className="absolute right-4 bottom-4 left-4 flex flex-col justify-between gap-2 text-white sm:flex-row sm:items-end">
          <div className="flex flex-col">
            <span className="text-surface-container-highest text-[11px] font-semibold">
              Phân đoạn trọng điểm trích xuất tự động
            </span>
            <span className="font-heading text-surface-container-lowest text-sm font-bold sm:text-base">
              Bản ghi tương tác: Mẫu câu 〜わけではない & Ví dụ thực tế
            </span>
          </div>

          <div className="bg-surface-container-lowest/20 flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs backdrop-blur-sm">
            <Subtitles className="size-4" />
            <span>Song ngữ JP - VN</span>
          </div>
        </div>
      </div>

      {/* Video Metadata Bar */}
      <div className="bg-surface-container-low/50 flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 border border-slate-200 dark:border-slate-700">
            <AvatarImage
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Tanaka Sensei"
            />
            <AvatarFallback className="bg-primary text-xs font-bold text-white">
              TK
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-on-surface text-xs font-bold dark:text-white">
              Ghi hình trực tiếp phòng N3-A
            </span>
            <span className="text-on-surface-variant text-[11px]">
              Lưu đồ bảng đen nhận diện tự động 14 từ khóa & 3 cấu trúc ngữ pháp
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadBoard}
            className="text-primary hover:bg-surface-container flex h-8 items-center gap-1 px-2.5 text-xs dark:text-white"
          >
            <Download className="size-3.5" />
            <span>Tải Board PDF</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFullRecord}
            className="text-primary hover:bg-surface-container flex h-8 items-center gap-1 px-2.5 text-xs dark:text-white"
          >
            <ExternalLink className="size-3.5" />
            <span>Xem Full Record (90p)</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
