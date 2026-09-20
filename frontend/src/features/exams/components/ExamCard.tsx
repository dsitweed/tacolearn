import { BookOpen, Clock, FileText, Users } from 'lucide-react';
import Link from 'next/link';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Exam } from '@/generated/model/exam';

interface ExamCardProps {
  exam: Exam;
}

export function ExamCard({ exam }: ExamCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'N1':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'N2':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'N3':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'N4':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'N5':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'OFFICIAL':
        return 'Đề chính thức';
      case 'MOCK':
        return 'Đề mô phỏng';
      default:
        return 'Đề thi';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Card className="group transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
              {exam.title}
            </CardTitle>
            {exam.description && (
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                {exam.description}
              </p>
            )}
          </div>
          <Badge className={`${getLevelColor(exam.jlptLevel)} font-semibold`}>
            {exam.jlptLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          {/* Exam Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FileText className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">Loại:</span>
              <span className="font-medium">{getTypeLabel(exam.type)}</span>
            </div>

            {exam.year && exam.month && (
              <div className="text-muted-foreground">
                {exam.year}/{exam.month}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">Thời gian</p>
                <p className="font-medium">
                  {exam.durationMinutes
                    ? `${exam.durationMinutes} phút`
                    : 'Không giới hạn'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">Số câu</p>
                <p className="font-medium">{exam.totalQuestions} câu</p>
              </div>
            </div>
          </div>

          {/* Created Info */}
          {exam.createdBy && (
            <div className="flex items-center gap-2 border-t pt-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <div className="text-sm">
                <span className="text-muted-foreground">Tạo bởi: </span>
                <span className="font-medium">
                  {exam.createdBy.profile?.firstName}{' '}
                  {exam.createdBy.profile?.lastName}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground text-xs">
            Đăng: {formatDate(exam.createdAt)}
          </div>
          <Button asChild size="sm">
            <Link href={`/exams/${exam.id}`}>Làm đề thi</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
