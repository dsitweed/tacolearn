import {
  CheckCircle,
  FileCheck2,
  Headphones,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Badge, Button, Card } from '@/components/ui';

interface CatchUpFourStagesProps {
  completedStages: Record<number, boolean>;
  onToggleStage: (stageIndex: number) => void;
}

export function CatchUpFourStages({
  completedStages,
  onToggleStage,
}: CatchUpFourStagesProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSyncSrs = () => {
    onToggleStage(2);
    toast.success('Đã đồng bộ thành công 15 từ vựng vào bộ thẻ SRS!');
  };

  const handlePlayDialogue = () => {
    setIsPlayingAudio(true);
    toast.info('Đang phát đoạn hội thoại mẫu (Tanaka & Yamada)...');
    setTimeout(() => {
      setIsPlayingAudio(false);
      onToggleStage(3);
    }, 2000);
  };

  const handleStartQuiz = () => {
    onToggleStage(4);
    toast.success(
      'Bắt đầu bài kiểm tra 10 câu. Đạt ≥ 80% sẽ tự động hoàn tác điểm danh!',
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <span className="text-secondary block text-[11px] font-bold tracking-wider uppercase">
            LỘ TRÌNH HỌC BÙ TỪNG BƯỚC
          </span>
          <h2 className="font-heading text-primary text-lg font-bold sm:text-xl dark:text-white">
            Danh sách 4 chặng học bù (Classroom Digest)
          </h2>
        </div>
        <span className="text-on-surface-variant text-xs font-medium">
          Mục tiêu: Đạt 100% để khôi phục điểm danh
        </span>
      </div>

      {/* Stage 1: Core Grammar */}
      <Card
        className={`flex flex-col gap-3 rounded-xl border p-4 shadow-xs transition-all sm:p-5 ${
          completedStages[1]
            ? 'border-secondary/30 bg-secondary/5 dark:bg-emerald-950/10'
            : 'bg-surface-container-lowest border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex items-start gap-3">
            <div
              onClick={() => onToggleStage(1)}
              className={`font-heading flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                completedStages[1]
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container text-primary dark:bg-slate-800 dark:text-white'
              }`}
              title="Click để đánh dấu hoàn thành"
            >
              {completedStages[1] ? <CheckCircle className="size-5" /> : '1'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-on-surface text-base font-bold dark:text-white">
                  Ngữ pháp cốt lõi (Core Grammar)
                </span>
                <Badge className="bg-surface-container text-on-surface-variant border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
                  8 phút
                </Badge>
                <Badge className="bg-secondary-container text-on-secondary-container border-none px-2 py-0 text-[11px] font-semibold">
                  Trích xuất Board Sync
                </Badge>
              </div>

              <p className="text-on-surface-variant text-xs leading-relaxed">
                Cấu trúc{' '}
                <strong className="text-primary font-bold dark:text-white">
                  〜わけではない (Không hẳn là / Không có nghĩa là)
                </strong>
                . Tanaka Sensei phân tích sự khác biệt tinh tế giữa
                〜わけではない và 〜というわけではない tại phút 14:18.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => {
              onToggleStage(1);
              toast.info('Đang tua video đến phút 14:18...');
            }}
            className="bg-surface-container hover:bg-surface-container-high text-primary flex h-8 shrink-0 items-center gap-1.5 border-none px-3 text-xs font-semibold dark:bg-slate-800 dark:text-white"
          >
            <Play className="size-3.5 fill-current" />
            <span>Xem trích đoạn (14:18)</span>
          </Button>
        </div>

        {/* Formula Snippet */}
        <div className="bg-surface-container-low flex flex-col justify-between gap-2 rounded-lg border border-slate-100 p-3 text-xs md:flex-row md:items-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-surface-container-highest text-primary border-none px-2 py-0.5 text-[10px] font-bold dark:bg-slate-700 dark:text-white">
              CÔNG THỨC
            </Badge>
            <code className="text-on-surface font-semibold dark:text-slate-200">
              V / A-i / A-na (な) / N (の/な) + わけではない
            </code>
          </div>
          <span className="text-on-surface-variant italic">
            &quot;Phủ định một phần nhận định có vẻ hiển nhiên&quot;
          </span>
        </div>
      </Card>

      {/* Stage 2: Vocabulary & Kanji */}
      <Card
        className={`flex flex-col gap-4 rounded-xl border p-4 shadow-xs transition-all sm:p-5 ${
          completedStages[2]
            ? 'border-secondary/30 bg-secondary/5 dark:bg-emerald-950/10'
            : 'bg-surface-container-lowest border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex items-start gap-3">
            <div
              onClick={() => onToggleStage(2)}
              className={`font-heading flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                completedStages[2]
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container text-primary dark:bg-slate-800 dark:text-white'
              }`}
              title="Click để đánh dấu hoàn thành"
            >
              {completedStages[2] ? <CheckCircle className="size-5" /> : '2'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-on-surface text-base font-bold dark:text-white">
                  Từ vựng & Hán tự trọng tâm
                </span>
                <Badge className="bg-surface-container text-on-surface-variant border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
                  5 phút
                </Badge>
                <Badge className="bg-secondary-fixed text-on-secondary-fixed border-none px-2 py-0 text-[11px] font-semibold">
                  15 từ trích xuất Slide
                </Badge>
              </div>

              <p className="text-on-surface-variant text-xs leading-relaxed">
                15 từ vựng thực tế được dùng nhiều nhất trong buổi hội thoại của
                lớp. Đã tự động gắn tag và sẵn sàng nạp vào bộ thẻ nhớ lặp lại
                ngắt quãng.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleSyncSrs}
            className="bg-secondary text-on-secondary flex h-8 shrink-0 items-center gap-1.5 border-none px-3 text-xs font-semibold shadow-xs hover:opacity-90"
          >
            <RotateCcw className="size-3.5" />
            <span>Đồng bộ SRS</span>
          </Button>
        </div>

        {/* Vocabulary Cards Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="bg-surface-container-low hover:bg-surface-container flex flex-col rounded-lg p-3 transition-colors dark:bg-slate-800/40">
            <div className="flex items-baseline justify-between">
              <span className="text-primary text-lg font-bold dark:text-white">
                断る
              </span>
              <span className="text-on-surface-variant text-xs">ことわる</span>
            </div>
            <span className="text-on-surface mt-1 text-xs font-semibold dark:text-slate-200">
              Từ chối, bác bỏ
            </span>
            <div className="text-on-surface-variant mt-2 flex items-center justify-between text-[11px]">
              <span>Động từ nhóm 1</span>
              <span className="text-secondary font-semibold dark:text-emerald-400">
                Ready SRS
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low hover:bg-surface-container flex flex-col rounded-lg p-3 transition-colors dark:bg-slate-800/40">
            <div className="flex items-baseline justify-between">
              <span className="text-primary text-lg font-bold dark:text-white">
                事情
              </span>
              <span className="text-on-surface-variant text-xs">じじょう</span>
            </div>
            <span className="text-on-surface mt-1 text-xs font-semibold dark:text-slate-200">
              Hoàn cảnh, lý do sự tình
            </span>
            <div className="text-on-surface-variant mt-2 flex items-center justify-between text-[11px]">
              <span>Danh từ</span>
              <span className="text-secondary font-semibold dark:text-emerald-400">
                Ready SRS
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low hover:bg-surface-container flex flex-col rounded-lg p-3 transition-colors dark:bg-slate-800/40">
            <div className="flex items-baseline justify-between">
              <span className="text-primary text-lg font-bold dark:text-white">
                納得
              </span>
              <span className="text-on-surface-variant text-xs">なっとく</span>
            </div>
            <span className="text-on-surface mt-1 text-xs font-semibold dark:text-slate-200">
              Thấu hiểu, đồng ý, bị thuyết phục
            </span>
            <div className="text-on-surface-variant mt-2 flex items-center justify-between text-[11px]">
              <span>Danh từ / Suru</span>
              <span className="text-secondary font-semibold dark:text-emerald-400">
                Ready SRS
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stage 3: Listening & Conversation Context */}
      <Card
        className={`flex flex-col gap-3 rounded-xl border p-4 shadow-xs transition-all sm:p-5 ${
          completedStages[3]
            ? 'border-secondary/30 bg-secondary/5 dark:bg-emerald-950/10'
            : 'bg-surface-container-lowest border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex items-start gap-3">
            <div
              onClick={() => onToggleStage(3)}
              className={`font-heading flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                completedStages[3]
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container text-primary dark:bg-slate-800 dark:text-white'
              }`}
              title="Click để đánh dấu hoàn thành"
            >
              {completedStages[3] ? <CheckCircle className="size-5" /> : '3'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-on-surface text-base font-bold dark:text-white">
                  Luyện nghe ngữ cảnh hội thoại
                </span>
                <Badge className="bg-surface-container text-on-surface-variant border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
                  6 phút
                </Badge>
                <Badge className="bg-surface-container-high text-on-surface border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-700 dark:text-slate-200">
                  Tokyo Office Context
                </Badge>
              </div>

              <p className="text-on-surface-variant text-xs leading-relaxed">
                Đoạn hội thoại thực hành nhóm: &quot;Asking for Clarification
                politely at workplace&quot;. Có transcript kèm Furigana tương
                tác.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handlePlayDialogue}
            className="bg-surface-container hover:bg-surface-container-high text-primary flex h-8 shrink-0 items-center gap-1.5 border-none px-3 text-xs font-semibold dark:bg-slate-800 dark:text-white"
          >
            <Headphones className="size-3.5" />
            <span>
              {isPlayingAudio ? 'Đang phát...' : 'Mở trình phát Audio'}
            </span>
          </Button>
        </div>

        {/* Interactive Transcript Preview */}
        <div className="bg-surface-container-low flex flex-col gap-2 rounded-lg border border-slate-100 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40">
          <div className="text-on-surface-variant flex items-center justify-between text-[11px]">
            <span className="text-primary font-bold dark:text-white">
              Audio Sample: Hội thoại Tanaka & Yamada (02:14)
            </span>
            <span className="text-secondary font-medium dark:text-emerald-400">
              Bản ghi chất lượng cao
            </span>
          </div>

          <div className="bg-surface-container-lowest text-on-surface rounded border border-slate-100 p-2.5 leading-relaxed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <span className="text-primary font-bold dark:text-white">
              田中：
            </span>
            「決して行きたくない
            <ruby className="text-secondary font-semibold dark:text-emerald-400">
              わけではない
              <rt className="text-on-surface-variant text-[9px]">
                không hẳn là
              </rt>
            </ruby>
            のですが、あいにく先約がございまして…」
          </div>

          <p className="text-on-surface-variant text-[11px] italic">
            (Tanaka: &quot;Không hẳn là tôi không muốn đi đâu, nhưng không may
            là tôi đã có hẹn từ trước rồi ạ...&quot;)
          </p>
        </div>
      </Card>

      {/* Stage 4: Mastery Verification Quiz */}
      <Card
        className={`flex flex-col gap-3 rounded-xl border p-4 shadow-xs transition-all sm:p-5 ${
          completedStages[4]
            ? 'border-secondary/30 bg-secondary/5 dark:bg-emerald-950/10'
            : 'bg-surface-container-lowest border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex items-start gap-3">
            <div
              onClick={() => onToggleStage(4)}
              className={`font-heading flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                completedStages[4]
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container text-primary dark:bg-slate-800 dark:text-white'
              }`}
              title="Click để đánh dấu hoàn thành"
            >
              {completedStages[4] ? <CheckCircle className="size-5" /> : '4'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-on-surface text-base font-bold dark:text-white">
                  Bài kiểm tra xác thực hiểu bài (Mastery Quiz)
                </span>
                <Badge className="bg-surface-container text-on-surface-variant border-none px-2 py-0 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300">
                  5 phút
                </Badge>
                <Badge className="bg-error-container text-on-error-container border-none px-2 py-0 text-[11px] font-semibold">
                  Bắt buộc ≥ 80%
                </Badge>
              </div>

              <p className="text-on-surface-variant text-xs leading-relaxed">
                10 câu trắc nghiệm nhanh đánh giá mức độ hiểu mẫu câu và từ
                vựng. Đạt từ{' '}
                <strong className="text-on-surface dark:text-white">
                  8/10 câu
                </strong>{' '}
                trở lên để hệ thống tự động hoàn tác trạng thái vắng mặt.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleStartQuiz}
            className="bg-primary text-on-primary hover:bg-primary-container flex h-8 shrink-0 items-center gap-1.5 border-none px-3 text-xs font-semibold shadow-xs"
          >
            <FileCheck2 className="size-3.5" />
            <span>Làm bài kiểm tra (Start Quiz)</span>
          </Button>
        </div>

        {/* Pass Condition Alert Box */}
        <div className="bg-surface-container-low text-on-surface flex items-center gap-2 rounded-lg border border-slate-100 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
          <CheckCircle className="text-secondary size-4 shrink-0" />
          <span>
            Sau khi vượt qua bài Quiz, điểm chuyên cần của bạn sẽ lập tức tăng
            lại mức{' '}
            <strong className="text-secondary font-bold dark:text-emerald-400">
              94.0%
            </strong>{' '}
            mà không cần giáo vụ can thiệp thủ công.
          </span>
        </div>
      </Card>
    </div>
  );
}
