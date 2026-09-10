import { Bookmark, Brain, Eye, EyeOff, Languages, Volume2 } from 'lucide-react';
import { useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
} from '@/components/ui';

interface SrsFlashcardProps {
  showFurigana: boolean;
  onToggleFurigana: () => void;
  isPlayingAudio: boolean;
  onPlayAudio: () => void;
}

export function SrsFlashcard({
  showFurigana,
  onToggleFurigana,
  isPlayingAudio,
  onPlayAudio,
}: SrsFlashcardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Card className="bg-surface-container-lowest relative overflow-hidden rounded-xl border-slate-100 p-6 shadow-md sm:p-8 dark:border-slate-800">
      {/* Subtle Top Atmosphere Gradient */}
      <div className="from-surface-container via-surface-container-low pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl" />

      {/* Card Header Info */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-surface-container text-primary hover:bg-surface-container border-none text-xs font-semibold">
            JLPT N3
          </Badge>
          <Badge
            variant="outline"
            className="text-on-surface-variant border-slate-200 text-xs dark:border-slate-700"
          >
            Na-Adjective (Tính từ đuôi な)
          </Badge>
          <Badge className="flex items-center gap-1 border-amber-200/60 bg-amber-50 text-xs font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
            <Brain className="size-3.5 text-amber-600" />
            <span>Tỷ lệ nhớ: 58%</span>
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFurigana}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container flex h-8 items-center gap-1.5 px-2.5 text-xs"
          >
            {showFurigana ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="text-outline size-4" />
            )}
            <span>Furigana: {showFurigana ? 'ON' : 'OFF'}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container size-8 p-0"
            title="Đánh dấu sao"
          >
            <Bookmark
              className={`size-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
            />
          </Button>
        </div>
      </div>

      {/* Kanji Hero & Furigana Pronounce Area */}
      <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center">
        {/* Furigana notation */}
        <div
          className={`text-secondary mb-1 text-sm font-semibold tracking-widest transition-opacity duration-200 sm:text-base ${
            showFurigana ? 'opacity-100' : 'opacity-0 select-none'
          }`}
        >
          あいまい (aimai)
        </div>

        {/* Massive Japanese Typography */}
        <div className="text-primary text-5xl font-medium tracking-wide select-all sm:text-6xl dark:text-white">
          曖昧
        </div>

        {/* Audio Pronounce Button with Interactive Wave Visualizer */}
        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={onPlayAudio}
            size="sm"
            className="group bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary flex h-9 items-center gap-2 rounded-full border-none px-4 shadow-xs transition-all duration-200 active:scale-95 dark:bg-slate-800 dark:text-white dark:hover:bg-indigo-600"
          >
            <Volume2 className="size-4 transition-transform group-hover:scale-110" />
            <span className="text-xs font-semibold">
              {isPlayingAudio ? 'Đang phát âm...' : 'Nghe chuẩn Tokyo (R)'}
            </span>
          </Button>

          {/* Mini Audio Wave Animation Bars */}
          <div className="flex h-4 items-center gap-0.5 px-1.5">
            <span
              className={`bg-secondary w-1 rounded-full ${
                isPlayingAudio ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
              }`}
            />
            <span
              className={`bg-secondary w-1 rounded-full ${
                isPlayingAudio ? 'h-5 animate-pulse delay-75' : 'h-3 opacity-40'
              }`}
            />
            <span
              className={`bg-secondary w-1 rounded-full ${
                isPlayingAudio
                  ? 'h-4 animate-pulse delay-150'
                  : 'h-2 opacity-40'
              }`}
            />
            <span
              className={`bg-secondary w-1 rounded-full ${
                isPlayingAudio
                  ? 'h-5 animate-pulse delay-100'
                  : 'h-3.5 opacity-40'
              }`}
            />
            <span
              className={`bg-secondary w-1 rounded-full ${
                isPlayingAudio ? 'h-2.5 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Core Meaning Card Block */}
      <div className="bg-surface-container-low relative z-10 mb-4 rounded-xl p-4 dark:bg-slate-800/60">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-outline text-[11px] font-bold tracking-wider uppercase">
            Ý NGHĨA CỐT LÕI
          </span>
          <span className="text-secondary font-semibold dark:text-emerald-400">
            SRS Level: Apprentice III
          </span>
        </div>

        <p className="font-heading text-primary text-lg font-bold sm:text-xl dark:text-white">
          Mơ hồ, nhập nhằng, không rõ ràng{' '}
          <span className="text-on-surface-variant font-sans text-sm font-normal">
            (ambiguous / vague / indistinct)
          </span>
        </p>

        <div className="text-on-surface-variant mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-surface-container text-primary rounded px-2 py-0.5 text-[11px] font-semibold dark:bg-slate-700 dark:text-white">
            Từ loại
          </span>
          <span>
            曖昧な + Danh từ (曖昧な態度, 曖昧な返事) • 曖昧に + Động từ
          </span>
        </div>
      </div>

      {/* Example Sentence in Context Box */}
      <div className="bg-surface-container-lowest relative z-10 mb-4 rounded-xl border border-slate-100 p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-2 flex items-center justify-between text-xs">
          <div className="text-on-surface flex items-center gap-2 font-semibold dark:text-slate-200">
            <Languages className="text-primary size-4 dark:text-indigo-400" />
            <span>Ngữ cảnh thực tế (Example Sentence)</span>
          </div>

          <button
            onClick={onPlayAudio}
            className="text-secondary hover:text-on-secondary-container flex items-center gap-1 text-xs font-medium transition-colors"
          >
            <Volume2 className="size-3.5" />
            <span>Phát âm câu</span>
          </button>
        </div>

        <div className="space-y-1 pl-1 text-left">
          <p className="text-on-surface text-base leading-relaxed sm:text-lg dark:text-white">
            <span className="text-secondary font-bold dark:text-emerald-400">
              曖昧な
            </span>
            答えを避けてください。
          </p>
          <p className="text-outline font-mono text-xs">
            Aimaina kotae o sakete kudasai.
          </p>
          <p className="text-on-surface pt-0.5 text-sm font-medium dark:text-slate-300">
            Xin vui lòng tránh đưa ra câu trả lời mập mờ / không rõ ràng.
          </p>
        </div>
      </div>

      {/* Tanaka Sensei's Classroom Study Note Callout */}
      <div className="relative z-10 flex items-start gap-3.5 rounded-xl border border-amber-200/50 bg-amber-50/80 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <Avatar className="size-10 shrink-0 border border-amber-200 dark:border-amber-800">
          <AvatarImage
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
            alt="Tanaka Sensei"
          />
          <AvatarFallback className="bg-primary text-xs font-bold text-white">
            TN
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
              Lưu ý từ Tanaka Sensei (Lớp N3-A)
            </span>
            <Badge className="border-none bg-amber-200/60 px-2 py-0 text-[10px] font-semibold text-amber-950 dark:bg-amber-900/60 dark:text-amber-200">
              Trọng tâm Dokkai
            </Badge>
          </div>
          <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-300/90">
            &quot;Thường xuyên xuất hiện trong bài thi JLPT N3 phần Đọc hiểu
            (Dokkai) và ngữ cảnh công sở. Đặc biệt hay đi kèm với{' '}
            <strong className="font-semibold">返事</strong> (henji - hồi đáp)
            hoặc <strong className="font-semibold">態度</strong> (taido - thái
            độ) để thể hiện sự thiếu dứt khoát.&quot;
          </p>
        </div>
      </div>
    </Card>
  );
}
