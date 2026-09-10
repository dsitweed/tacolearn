import { Avatar, AvatarFallback, AvatarImage, Card } from '@/components/ui';

export function SenseiFeedbackNote() {
  return (
    <Card className="bg-surface-container-lowest flex items-center gap-3.5 rounded-2xl border-slate-100 p-4 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <Avatar className="border-secondary-fixed size-13 shrink-0 border-2">
        <AvatarImage
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
          alt="Tanaka Sensei"
        />
        <AvatarFallback className="bg-primary text-xs font-bold text-white">
          TK
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col space-y-0.5">
        <span className="text-on-surface-variant text-[11px] font-semibold">
          Lời dặn từ Tanaka Sensei:
        </span>
        <p className="text-on-surface text-xs leading-relaxed italic dark:text-slate-200">
          &quot;7/10 là xuất phát điểm rất vững ở N2. Đừng nản vì câu đảo chiều,
          hãy ghi nhớ mẹo khoanh vùng từ nối nhé Minh!&quot;
        </p>
      </div>
    </Card>
  );
}
