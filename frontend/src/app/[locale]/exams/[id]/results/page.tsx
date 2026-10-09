'use client';

import {
  ArrowLeft,
  BarChart,
  CheckCircle,
  Trophy,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { useExamSessionResult } from '@/hooks/api';

const SECTION_LABELS: Record<string, string> = {
  VOCABULARY: 'Từ vựng',
  GRAMMAR: 'Ngữ pháp',
  KANJI: 'Hán tự',
  READING: 'Đọc hiểu',
  LISTENING: 'Nghe hiểu',
};

function sectionLabel(section: string) {
  return SECTION_LABELS[section] ?? section;
}

function getRank(score: number) {
  if (score >= 90) return 'Xuất sắc';
  if (score >= 80) return 'Giỏi';
  if (score >= 70) return 'Khá';
  if (score >= 60) return 'Trung bình';
  return 'Yếu';
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds} giây`;
  }

  return `${minutes} phút ${String(seconds).padStart(2, '0')} giây`;
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-4">Đang tải kết quả...</p>
        </div>
      </div>
    </div>
  );
}

function ExamResultsContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = params.id as string;
  const sessionId = searchParams.get('sessionId') ?? '';

  const { data: result, isLoading, error } = useExamSessionResult(sessionId);

  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-muted rounded-lg border p-6">
          <h3 className="mb-2 font-semibold">Không có kết quả để hiển thị</h3>
          <p className="text-muted-foreground">
            Bạn cần hoàn thành bài thi trước khi xem kết quả.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push(`/exams/${examId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Làm đề thi
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 border-destructive rounded-lg border p-6">
          <h3 className="text-destructive mb-2 font-semibold">
            Lỗi khi tải kết quả
          </h3>
          <p className="text-destructive/80">
            {error?.message || 'Không tìm thấy kết quả đề thi'}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/exams')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách đề thi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.push(`/exams/${examId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại đề thi
        </Button>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Kết Quả Đề Thi
          </h1>
          <p className="text-muted-foreground text-lg">{result.examTitle}</p>
        </div>
      </div>

      {/* Result Summary */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Result Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Tổng Kết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Score */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                  <Progress
                    value={result.score}
                    className="h-32 w-32 [&>div]:h-32"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {Math.round(result.score)}
                      </div>
                      <div className="text-muted-foreground">điểm</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Badge
                    className={`px-4 py-1 text-lg ${
                      result.score >= 60
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {result.score >= 60 ? 'ĐẠT' : 'CHƯA ĐẠT'}
                  </Badge>
                  <p className="text-muted-foreground mt-2">
                    Xếp loại: {getRank(result.score)}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result.correctCount}
                  </div>
                  <div className="text-muted-foreground text-sm">Câu đúng</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {result.totalQuestions}
                  </div>
                  <div className="text-muted-foreground text-sm">Tổng câu</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {result.answeredCount}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Đã trả lời
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatDuration(result.timeSpent)}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Thời gian làm bài
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Chi Tiết
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cấp độ</span>
                <span className="font-semibold">{result.jlptLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Độ chính xác</span>
                <span className="font-semibold">
                  {Math.round(result.score)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Câu chưa trả lời</span>
                <span className="font-semibold">
                  {result.totalQuestions - result.answeredCount}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Phân Tích Theo Kỹ Năng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.sections.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Không có dữ liệu phân tích.
                </p>
              ) : (
                result.sections.map((section) => (
                  <div key={section.section}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm">
                        {sectionLabel(section.section)}
                      </span>
                      <span className="text-sm font-semibold">
                        {section.correct}/{section.total} ({section.accuracy}%)
                      </span>
                    </div>
                    <Progress value={section.accuracy} className="h-2" />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href={`/exams/${examId}`}>Làm lại đề thi</Link>
        </Button>

        <Button asChild variant="outline" className="flex-1">
          <Link href="/exams">Làm đề thi khác</Link>
        </Button>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Chi Tiết Câu Trả Lời</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.results.map((item, index) => (
              <div key={item.questionId} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Câu {index + 1}</span>
                    {item.isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <Badge variant="outline">{sectionLabel(item.section)}</Badge>
                </div>

                <p className="mb-3">{item.content}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Đáp án của bạn:
                    </span>
                    <span className="ml-2 font-semibold">
                      {item.selectedAnswer ?? 'Chưa trả lời'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Đáp án đúng:</span>
                    <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                      {item.correctAnswer}
                    </span>
                  </div>
                </div>

                {item.explanation && (
                  <div className="bg-muted mt-3 rounded-lg p-3">
                    <p className="mb-1 text-sm font-semibold">Giải thích:</p>
                    <p className="text-sm">{item.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ExamResultsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ExamResultsContent />
    </Suspense>
  );
}
