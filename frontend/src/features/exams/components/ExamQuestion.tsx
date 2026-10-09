import { CheckCircle, Circle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExamQuestion as ExamQuestionData } from '@/types';

interface ExamQuestionProps {
  question: ExamQuestionData;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
}

export function ExamQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: ExamQuestionProps) {
  const getSectionColor = (section: string) => {
    switch (section) {
      case 'VOCABULARY':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'GRAMMAR':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'READING':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'LISTENING':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSectionLabel = (section: string) => {
    switch (section) {
      case 'VOCABULARY':
        return 'Từ vựng';
      case 'GRAMMAR':
        return 'Ngữ pháp';
      case 'KANJI':
        return 'Hán tự';
      case 'READING':
        return 'Đọc hiểu';
      case 'LISTENING':
        return 'Nghe hiểu';
      default:
        return section;
    }
  };

  const getSkillLabel = (skill: string) => {
    switch (skill) {
      case 'VOCABULARY_MEANING':
        return 'Nghĩa từ vựng';
      case 'GRAMMAR_USAGE':
        return 'Sử dụng ngữ pháp';
      case 'READING_COMPREHENSION':
        return 'Đọc hiểu';
      case 'LISTENING_COMPREHENSION':
        return 'Nghe hiểu';
      default:
        return skill;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
              {questionNumber}
            </div>
            <CardTitle className="text-lg">
              Câu hỏi {questionNumber}/{totalQuestions}
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge className={getSectionColor(question.section)}>
              {getSectionLabel(question.section)}
            </Badge>
            {question.skill && (
              <Badge variant="outline">{getSkillLabel(question.skill)}</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question Content */}
        <div className="space-y-4">
          <div className="text-lg leading-relaxed font-medium">
            {question.content}
          </div>

          {question.imageUrl && (
            <div className="rounded-lg border p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.imageUrl}
                alt="Câu hỏi hình ảnh"
                className="mx-auto max-h-64 rounded-md"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          <h4 className="font-semibold">Chọn đáp án:</h4>
          <div className="grid grid-cols-1 gap-3">
            {question.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.code;

              return (
                <Button
                  key={choice.code}
                  variant="outline"
                  className={`h-auto min-h-[60px] justify-start p-4 text-left ${
                    isSelected
                      ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950/30'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => onAnswerSelect(choice.code)}
                >
                  <div className="flex w-full items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{choice.code}.</span>
                        <span className="text-base">{choice.text}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Cấp độ JLPT: </span>
            <span className="font-medium">{question.jlptLevel}</span>
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">Độ khó: </span>
            <span className="font-medium">{question.difficulty}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
