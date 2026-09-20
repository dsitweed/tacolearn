'use client';

import { ArrowRight, RotateCcw, Star, Timer, Volume2 } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button, Card } from '@/components/ui';
import { useExams } from '@/hooks/api';
import { Exam, JlptLevel } from '@/types';

interface FullMockExamSectionProps {
  level?: JlptLevel;
}

export function FullMockExamSection({ level }: FullMockExamSectionProps) {
  const { data: exams, isLoading } = useExams(level);

  const publishedExams = (exams ?? []).filter(
    (exam) => exam.isPublished && exam.type === 'MOCK',
  );
  const officialExams = (exams ?? []).filter(
    (exam) => exam.isPublished && exam.type === 'OFFICIAL',
  );

  const displayExams = officialExams.length > 0 ? officialExams : publishedExams;

  if (isLoading) {
    return (
      <section className="flex flex-col space-y-4">
        <div className="h-8 w-48 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="flex flex-col space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-primary h-6 w-2.5 rounded-full" />
          <div>
            <h3 className="font-heading text-primary text-lg font-bold tracking-tight sm:text-xl dark:text-white">
              Đề Thi Thử Toàn Diện (Full Mock Exam)
            </h3>
            <p className="text-on-surface-variant text-xs">
              Bộ bấm giờ thực tế đúng áp lực kỳ thi JLPT Quốc tế
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/exams"
          className="text-secondary flex items-center gap-1 text-xs font-semibold hover:underline dark:text-emerald-400"
        >
          <span>Xem tất cả {displayExams.length} đề Full</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of Exam Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {displayExams.map((exam) => (
          <Card
            key={exam.id}
            className="bg-surface-container-lowest group flex flex-col justify-between space-y-4 rounded-2xl border-slate-100 p-5 shadow-xs transition-all hover:shadow-md sm:p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <Badge
                  className={
                    exam.type === 'OFFICIAL'
                      ? 'bg-surface-container text-primary rounded border-none px-2.5 py-0.5 text-[11px] font-semibold dark:bg-slate-800 dark:text-slate-300'
                      : 'bg-secondary-container/50 text-secondary flex items-center gap-1 rounded border-none px-2.5 py-0.5 text-[11px] font-semibold dark:bg-emerald-950/80 dark:text-emerald-300'
                  }
                >
                  {exam.type === 'OFFICIAL' ? (
                    'KỲ THI CHÍNH THỨC'
                  ) : (
                    <span className="flex items-center gap-1">
                      <Star className="size-3 fill-current" /> TACO SPECIAL
                    </span>
                  )}
                </Badge>
                <span className="text-outline-variant font-mono text-[11px]">
                  #{exam.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <h4 className="font-heading text-primary group-hover:text-secondary text-base font-bold transition-colors dark:text-white dark:group-hover:text-emerald-400">
                {exam.title}
              </h4>

              {/* Meta Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                  <Timer className="size-3 text-slate-400" />{' '}
                  {exam.durationMinutes ?? '?'}p
                </span>
                <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                  {exam.jlptLevel} · {exam.totalQuestions} câu
                </span>
                {exam.month && (
                  <span className="bg-surface-container-low text-on-surface inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium dark:bg-slate-800 dark:text-slate-300">
                    Kỳ {exam.month}/{exam.year}
                  </span>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-outline flex items-center gap-1.5 text-xs font-medium">
                <span className="bg-secondary size-2 rounded-full" /> Chưa
                làm
              </span>

              <Button
                size="sm"
                className="bg-primary text-on-primary hover:bg-primary-container flex h-9 items-center gap-1.5 rounded-lg px-4 text-xs font-semibold shadow-xs"
              >
                <span>Vào phòng thi thử</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
