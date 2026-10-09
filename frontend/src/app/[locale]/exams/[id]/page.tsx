'use client';

import { AlertTriangle, ArrowLeft, Clock, HelpCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Progress,
  Separator,
} from '@/components/ui';
import { ExamQuestion, ExamTimer } from '@/features/exams/components';
import { useExam, useSubmitExam } from '@/hooks/api';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const { data: exam, isLoading, error } = useExam(examId);
  const { mutate: submitExam, isPending: isSubmitting } = useSubmitExam();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const startedAtRef = useRef<number | null>(null);
  const submittedRef = useRef(false);
  const answersRef = useRef(answers);

  const durationMinutes = exam?.durationMinutes ?? null;
  const totalTimeSeconds = durationMinutes ? durationMinutes * 60 : null;

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Countdown against a wall-clock start so the clock cannot drift.
  useEffect(() => {
    if (!durationMinutes) {
      return;
    }

    startedAtRef.current = Date.now();

    const timer = setInterval(() => {
      const startedAt = startedAtRef.current;
      if (startedAt) {
        setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [exam?.id, durationMinutes]);

  const timeRemaining =
    totalTimeSeconds === null
      ? null
      : Math.max(totalTimeSeconds - elapsedSeconds, 0);

  const submit = useCallback(
    (isAutoSubmit: boolean) => {
      if (submittedRef.current) {
        return;
      }

      submittedRef.current = true;

      const answersArray = Object.entries(answersRef.current).map(
        ([questionId, selectedAnswer]) => ({ questionId, selectedAnswer }),
      );

      const startedAt = startedAtRef.current;
      const elapsed = startedAt
        ? Math.floor((Date.now() - startedAt) / 1000)
        : 0;
      const timeSpent =
        isAutoSubmit && totalTimeSeconds !== null ? totalTimeSeconds : elapsed;

      submitExam(
        { examId, data: { answers: answersArray, timeSpent } },
        {
          onSuccess: (data) => {
            router.replace(
              `/exams/${examId}/results?sessionId=${data.sessionId}`,
            );
          },
          onError: () => {
            // Allow the student to retry after a failed submission.
            submittedRef.current = false;
          },
        },
      );
    },
    [examId, router, submitExam, totalTimeSeconds],
  );

  // Auto submit when the clock runs out.
  useEffect(() => {
    if (timeRemaining === 0) {
      submit(true);
    }
  }, [timeRemaining, submit]);

  const totalQuestions = exam?.questions?.length ?? 0;
  const answeredQuestions = Object.keys(answers).length;
  const unansweredQuestions = Math.max(totalQuestions - answeredQuestions, 0);
  const progressPercentage =
    totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const currentQuestion = exam?.questions?.[currentQuestionIndex];

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleConfirmSubmit = () => {
    setIsConfirmOpen(false);
    submit(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
            <p className="text-muted-foreground mt-4">Đang tải đề thi...</p>
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
            Lỗi khi tải đề thi
          </h3>
          <p className="text-destructive/80">
            {error?.message || 'Không tìm thấy đề thi'}
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
          onClick={() => router.push('/exams')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại danh sách đề thi
        </Button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{exam.title}</h1>
            {exam.description && (
              <p className="text-muted-foreground mt-1">{exam.description}</p>
            )}
          </div>

          {totalTimeSeconds === null ? (
            <p className="text-muted-foreground text-sm">
              Không giới hạn thời gian
            </p>
          ) : (
            <div className="flex items-center gap-4">
              <ExamTimer
                timeRemaining={timeRemaining ?? totalTimeSeconds}
                totalTime={totalTimeSeconds}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Sidebar - Progress & Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">Tiến độ làm bài</h3>
                    <span className="text-muted-foreground text-sm">
                      {answeredQuestions}/{totalQuestions} câu
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {/* Question Navigation */}
                <div>
                  <h3 className="mb-3 font-semibold">Danh sách câu hỏi</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {exam.questions.map((question, index) => (
                      <Button
                        key={question.id}
                        variant={
                          currentQuestionIndex === index ? 'default' : 'outline'
                        }
                        size="sm"
                        className={`h-10 ${
                          answers[question.id]
                            ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                            : ''
                        }`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <Separator />
                <div className="space-y-3">
                  {timeRemaining !== null && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm">Thời gian còn lại</span>
                      </div>
                      <span className="font-semibold">
                        {Math.floor(timeRemaining / 60)}:
                        {String(timeRemaining % 60).padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">Đã trả lời</span>
                    </div>
                    <span className="font-semibold">
                      {answeredQuestions}/{totalQuestions}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full"
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={isSubmitting || totalQuestions === 0}
                  >
                    {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Câu trước
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex >= totalQuestions - 1}
                    >
                      Câu sau
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Question */}
        <div className="lg:col-span-2">
          {currentQuestion ? (
            <ExamQuestion
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswerSelect={(answer) =>
                handleAnswerSelect(currentQuestion.id, answer)
              }
            />
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="py-12 text-center">
                  <HelpCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    Không có câu hỏi
                  </h3>
                  <p className="text-muted-foreground">
                    Đề thi này không có câu hỏi nào.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nộp bài thi?</DialogTitle>
            <DialogDescription>
              Bạn đã trả lời {answeredQuestions}/{totalQuestions} câu.
              {unansweredQuestions > 0 && (
                <span className="text-destructive mt-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Còn {unansweredQuestions} câu chưa trả lời.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Tiếp tục làm bài
            </Button>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              Nộp bài
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
