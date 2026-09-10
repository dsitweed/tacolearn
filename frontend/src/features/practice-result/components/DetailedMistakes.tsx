import { ArrowRight, CheckCircle2, Lightbulb, XCircle } from 'lucide-react';

import { Badge, Button, Card } from '@/components/ui';

interface MistakeItem {
  id: number;
  questionNumber: number;
  tag: string;
  title: string;
  difficulty: string;
  studentOption: {
    label: string;
    text: string;
    comment: string;
  };
  correctOption: {
    label: string;
    text: string;
    comment: string;
  };
  keyClue: string;
  clueCode?: string;
  clueSuffix?: string;
  timeSpent: string;
  timeNote?: string;
}

interface DetailedMistakesProps {
  onViewDetailedExplanation: (id: number) => void;
}

export function DetailedMistakes({
  onViewDetailedExplanation,
}: DetailedMistakesProps) {
  const mistakes: MistakeItem[] = [
    {
      id: 4,
      questionNumber: 4,
      tag: "Quan điểm tác giả (Author's Opinion)",
      title:
        'Ý định thực sự của tác giả về việc sử dụng ngôn từ trong đàm phán',
      difficulty: 'N2 · Độ khó Trung bình',
      studentOption: {
        label: 'Lựa chọn B',
        text: '"B. Người đàm phán giỏi phải luôn thỏa hiệp để giữ hòa khí bằng mọi giá."',
        comment: 'Đã rơi vào bẫy tuyệt đối hóa (Bẫy kinh điển N2)',
      },
      correctOption: {
        label: 'Lựa chọn D',
        text: '"D. Cần lựa chọn câu từ chính xác để vừa bảo vệ lập trường vừa duy trì sự tin cậy."',
        comment: 'Quan điểm cốt lõi đoạn 3 dòng cuối',
      },
      keyClue: 'Cụm từ then chốt ',
      clueCode: '「むしろ、言葉を慎重に選ぶことこそが信頼の基盤となる」',
      clueSuffix:
        ' chính là đòn bẩy khẳng định. Câu B bị loại vì bài đọc không nhắc đến việc nhượng bộ vô điều kiện.',
      timeSpent: '2m 14s',
      timeNote: '(Quá thời gian đề xuất 35s)',
    },
    {
      id: 7,
      questionNumber: 7,
      tag: 'Suy luận ngữ cảnh (Contextual Inference)',
      title:
        'Thái độ của nhân vật "Anh Suzuki" đối với sự thay đổi của công ty',
      difficulty: 'N2 · Độ khó Khá',
      studentOption: {
        label: 'Lựa chọn A',
        text: '"A. Anh Suzuki hoàn toàn phản đối chính sách làm việc từ xa vì sợ mất kết nối."',
        comment: 'Nhầm lẫn suy đoán cá nhân với góc nhìn khách quan',
      },
      correctOption: {
        label: 'Lựa chọn C',
        text: '"C. Anh Suzuki đón nhận với tâm thế thận trọng và đề xuất duy trì họp trực tiếp định kỳ."',
        comment: 'Khớp trọn vẹn ngữ cảnh diễn tiến câu chuyện',
      },
      keyClue:
        'Người đọc dễ nhầm lời than thở ban đầu của Suzuki với kết luận hành động của anh ở câu kế tiếp: ',
      clueCode: '「とはいえ、適応しないわけにもいかない」',
      clueSuffix: '.',
      timeSpent: '1m 40s',
    },
    {
      id: 9,
      questionNumber: 9,
      tag: "Quan điểm tác giả (Author's Opinion)",
      title:
        'Kết luận cuối cùng về tác động của công nghệ AI đối với dịch thuật',
      difficulty: 'N2 · Độ khó Trung bình',
      studentOption: {
        label: 'Lựa chọn C',
        text: '"C. Máy móc sẽ sớm thay thế hoàn toàn vai trò của dịch giả văn học."',
        comment: 'Bỏ qua liên từ đảo chiều chuyển ý',
      },
      correctOption: {
        label: 'Lựa chọn A',
        text: '"A. AI chỉ là công cụ hỗ trợ; sự cảm thụ văn hóa sâu sắc của con người vẫn là yếu tố không thể thay thế."',
        comment: 'Khẳng định chắc chắn ở câu chốt',
      },
      keyClue: 'Liên từ tương phản ',
      clueCode: '「しかし、だからといって〜わけではない」',
      clueSuffix:
        ' ở đoạn kết đảo ngược hoàn toàn luận điểm công nghệ áp đảo phía trên.',
      timeSpent: '1m 12s',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <XCircle className="text-error size-5" />
          <h2 className="font-heading text-primary text-lg font-bold sm:text-xl dark:text-white">
            Phân tích chi tiết 3 câu làm sai
          </h2>
        </div>
        <span className="text-on-surface-variant hidden text-xs sm:inline">
          Nhấp vào từng câu để xem dịch nghĩa & ngữ cảnh chi tiết
        </span>
      </div>

      {/* Mistake Cards */}
      <div className="space-y-4">
        {mistakes.map((m) => (
          <Card
            key={m.id}
            className="bg-surface-container-lowest flex flex-col gap-4 rounded-2xl border-slate-100 p-5 shadow-xs transition-shadow hover:shadow-md sm:p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Top Row */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <span className="bg-error-container text-on-error-container font-heading flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {m.questionNumber}
                </span>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-error/10 text-error border-none px-2 py-0 text-[10px] font-bold">
                      Chưa chính xác
                    </Badge>
                    <span className="text-on-surface-variant text-xs font-medium">
                      • {m.tag}
                    </span>
                  </div>

                  <h4 className="font-heading text-primary text-sm leading-snug font-bold sm:text-base dark:text-white">
                    Câu hỏi #{m.questionNumber}: {m.title}
                  </h4>
                </div>
              </div>

              <Badge className="bg-surface-container text-on-surface border-none px-2.5 py-0.5 text-xs font-medium dark:bg-slate-800 dark:text-slate-300">
                {m.difficulty}
              </Badge>
            </div>

            {/* Answer Comparison Grid */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Student Pick */}
              <div className="bg-error-container/20 border-error/15 flex flex-col justify-between space-y-2 rounded-xl border p-3.5 dark:bg-red-950/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-error flex items-center gap-1 text-[11px] font-bold">
                    <XCircle className="size-3.5" /> Lựa chọn của bạn
                  </span>
                  <span className="text-on-surface-variant text-[11px] font-medium">
                    {m.studentOption.label}
                  </span>
                </div>
                <p className="text-on-surface text-xs leading-relaxed dark:text-slate-200">
                  {m.studentOption.text}
                </p>
                <span className="text-error text-[11px] font-medium">
                  {m.studentOption.comment}
                </span>
              </div>

              {/* Correct Pick */}
              <div className="bg-secondary-container/25 border-secondary/20 flex flex-col justify-between space-y-2 rounded-xl border p-3.5 dark:bg-emerald-950/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-secondary flex items-center gap-1 text-[11px] font-bold dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" /> Đáp án chuẩn xác
                  </span>
                  <span className="text-secondary text-[11px] font-bold dark:text-emerald-400">
                    {m.correctOption.label}
                  </span>
                </div>
                <p className="text-on-surface text-xs leading-relaxed dark:text-slate-200">
                  {m.correctOption.text}
                </p>
                <span className="text-secondary text-[11px] font-medium dark:text-emerald-400">
                  {m.correctOption.comment}
                </span>
              </div>
            </div>

            {/* Core Takeaway Summary */}
            <div className="bg-surface-container-low text-on-surface flex items-start gap-2 rounded-lg border border-slate-100 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-200">
              <Lightbulb className="text-primary mt-0.5 size-4 shrink-0 dark:text-indigo-400" />
              <p className="leading-relaxed">
                <strong className="text-primary font-bold dark:text-white">
                  Điểm mấu chốt:
                </strong>{' '}
                {m.keyClue}
                {m.clueCode && (
                  <code className="bg-surface-container-high text-primary rounded px-1 py-0.5 font-bold dark:bg-slate-700 dark:text-white">
                    {m.clueCode}
                  </code>
                )}
                {m.clueSuffix}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <span className="text-on-surface-variant text-[11px]">
                Thời gian làm câu này:{' '}
                <strong className="text-on-surface dark:text-white">
                  {m.timeSpent}
                </strong>{' '}
                {m.timeNote}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetailedExplanation(m.id)}
                className="text-primary hover:bg-surface-container flex h-8 items-center gap-1 px-2.5 text-xs font-semibold hover:underline dark:text-indigo-400"
              >
                <span>Xem giải thích chi tiết</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
