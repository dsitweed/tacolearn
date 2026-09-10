import { MessageCircle, Quote } from 'lucide-react';
import { toast } from 'sonner';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
} from '@/components/ui';

export function TeacherDirectMessageCard() {
  const handleMessageSensei = () => {
    toast.info('Đang mở hộp thoại tin nhắn trực tiếp với Tanaka Sensei.');
  };

  return (
    <Card className="bg-surface-container-lowest flex flex-col gap-4 rounded-2xl border-slate-100 p-5 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Teacher Row */}
      <div className="flex items-center gap-3">
        <Avatar className="border-secondary-fixed size-11 border-2">
          <AvatarImage
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
            alt="Tanaka Kenji Sensei"
          />
          <AvatarFallback className="bg-primary text-xs font-bold text-white">
            TK
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h4 className="font-heading text-primary text-base font-bold dark:text-white">
            Tanaka Kenji
          </h4>
          <span className="text-on-surface-variant text-xs">
            Chủ nhiệm lớp N3-A • Gửi 4 giờ trước
          </span>
        </div>
      </div>

      {/* Quote Message Box */}
      <div className="bg-surface-container-low text-on-surface relative rounded-xl border border-slate-100 p-4 text-xs leading-relaxed dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-200">
        <Quote className="text-surface-container-highest pointer-events-none absolute top-2 right-2 size-7 opacity-40" />
        <p className="italic">
          &quot;Chào Minh! Thầy rất tiếc vì hôm qua em không thể tham gia lớp
          trực tiếp. Mẫu câu{' '}
          <strong className="text-primary font-semibold not-italic dark:text-white">
            〜わけではない
          </strong>{' '}
          tương đối trừu tượng và người học thường dễ nhầm lẫn với phủ định toàn
          bộ. Em nhớ xem kỹ đoạn clip 8 phút và làm bài tập nhé! Nếu có chỗ nào
          chưa hiểu, em cứ bấm nút nhắn trực tiếp cho thầy.&quot;
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMessageSensei}
          className="text-primary hover:text-primary-container inline-flex h-auto items-center gap-1.5 p-0 font-semibold hover:bg-transparent dark:text-indigo-400"
        >
          <MessageCircle className="size-4" />
          <span>Nhắn tin cho Sensei</span>
        </Button>

        <span className="text-on-surface-variant flex items-center gap-1.5 text-[11px] font-medium">
          <span className="bg-secondary size-2 rounded-full" />
          Online thường lệ
        </span>
      </div>
    </Card>
  );
}
