import { Clock } from 'lucide-react';

import { Badge } from '@/components/ui';

interface ExamTimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function ExamTimer({ timeRemaining, totalTime }: ExamTimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getTimeColor = () => {
    if (timeRemaining <= 300) return 'text-red-600 dark:text-red-400';
    if (timeRemaining <= 600) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProgressPercentage = () => {
    if (totalTime === 0) return 100;
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  return (
    <div className="flex items-center gap-3">
      <Clock className="text-muted-foreground h-5 w-5" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold ${getTimeColor()}`}>
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </span>
          <Badge variant="outline" className="font-normal">
            Thời gian còn lại
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="mt-1 w-48">
          <div className="bg-muted h-1 overflow-hidden rounded-full">
            <div
              className={`h-full ${getTimeColor().replace('text-', 'bg-')}`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
