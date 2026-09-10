import { Play, Video } from 'lucide-react';
import Image from 'next/image';

import { Button, Card } from '@/components/ui';

export function SrsClassroomVideoCard() {
  return (
    <Card className="bg-surface-container-lowest group overflow-hidden rounded-xl border-slate-100 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Video Thumbnail Header */}
      <div className="relative h-28 w-full overflow-hidden bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
          alt="Tanaka Sensei Tokyo Classroom Blackboard lecture scene"
          fill
          className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
        />

        <div className="bg-primary/60 backdrop-blur-2xs group-hover:bg-primary/50 absolute inset-0 flex items-center justify-center transition-colors">
          <div className="bg-surface-container-lowest text-primary flex size-10 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-110">
            <Play className="text-primary ml-0.5 size-5 fill-current" />
          </div>
        </div>

        <span className="bg-primary/80 absolute right-2 bottom-2 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium text-white">
          14:15
        </span>
      </div>

      {/* Details Box */}
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-secondary font-semibold dark:text-emerald-400">
            Video cắt nghĩa bài giảng
          </span>
          <span className="text-on-surface-variant text-[11px] font-medium">
            Bài 18
          </span>
        </div>

        <p className="text-on-surface text-xs leading-tight font-bold dark:text-white">
          Tanaka Sensei giải thích cách phân biệt 曖昧 vs 明確
        </p>

        <Button
          variant="secondary"
          size="sm"
          className="bg-surface-container hover:bg-surface-container-high text-primary mt-3 flex h-8 w-full items-center justify-center gap-1.5 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200"
        >
          <Video className="size-3.5" />
          <span>Mở video bài giảng (14:15)</span>
        </Button>
      </div>
    </Card>
  );
}
