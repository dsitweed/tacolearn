'use client';

import {
  ArrowLeft,
  BarChart,
  CheckCircle,
  Trophy,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { Question } from '@/generated/model/question';
import { useExam } from '@/hooks/api';

export default function ExamResultsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const { data: exam, isLoading, error } = useExam(examId);

  // Mock data for results (in real app, this would come from API)
  const mockResults = {
    score: 85,
    correctAnswers: 34,
    totalQuestions: 40,
    timeSpent: 45, // minutes
    accuracy: 85,
    rank: 'Khá',
    passed: true,
    answers: [
      { questionId: '1', correct: true, userAnswer: 'A', correctAnswer: 'A' },
      { questionId: '2', correct: true, userAnswer: 'B', correctAnswer: 'B' },
      { questionId: '3', correct: false, userAnswer: 'C', correctAnswer: 'D' },
      // ... more answers
    ],
  };

  if (isLoading) {
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

  if (error || !exam) {
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
          <p className="text-muted-foreground text-lg">{exam.title}</p>
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
              {/* Score Circle */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                  <Progress
                    value={mockResults.score}
                    className="h-32 w-32 [&>div]:h-32"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {mockResults.score}
                      </div>
                      <div className="text-muted-foreground">điểm</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Badge
                    className={`px-4 py-1 text-lg ${
                      mockResults.passed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {mockResults.passed ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                  </Badge>
                  <p className="text-muted-foreground mt-2">
                    Xếp loại: {mockResults.rank}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {mockResults.correctAnswers}
                  </div>
                  <div className="text-muted-foreground text-sm">Câu đúng</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockResults.totalQuestions}
                  </div>
                  <div className="text-muted-foreground text-sm">Tổng câu</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockResults.accuracy}%
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Độ chính xác
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockResults.timeSpent}
                  </div>
                  <div className="text-muted-foreground text-sm">Phút</div>
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
                Thành Tích
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Điểm cao nhất</span>
                <span className="font-semibold">92</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lần làm</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cải thiện</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  +8%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Phân Tích
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm">Từ vựng</span>
                  <span className="text-sm font-semibold">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm">Ngữ pháp</span>
                  <span className="text-sm font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm">Đọc hiểu</span>
                  <span className="text-sm font-semibold">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm">Nghe hiểu</span>
                  <span className="text-sm font-semibold">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href={`/exams/${examId}`}>Làm lại đề thi</Link>
        </Button>

        <Button variant="outline" className="flex-1">
          Xem giải thích chi tiết
        </Button>

        <Button variant="outline" className="flex-1">
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
            {(exam as any).questions
              ?.slice(0, 5)
              .map((question: Question, index: number) => (
                <div key={question.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Câu {index + 1}</span>
                      {index < 3 ? (
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <Badge variant="outline">{question.section}</Badge>
                  </div>

                  <p className="mb-3">{question.content}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Đáp án của bạn:
                      </span>
                      <span className="ml-2 font-semibold">A</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Đáp án đúng:
                      </span>
                      <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                        {index < 3 ? 'A' : 'B'}
                      </span>
                    </div>
                  </div>

                  {question.explanation && (
                    <div className="bg-muted mt-3 rounded-lg p-3">
                      <p className="mb-1 text-sm font-semibold">Giải thích:</p>
                      <p className="text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">
              Xem tất cả {(exam as any).questions?.length} câu hỏi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
