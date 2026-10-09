import type { Exam } from '@/generated/model/exam';
import type { JlptLevel } from '@/generated/model/jlptLevel';
import type { QuestionSection } from '@/generated/model/questionSection';

export type ExamChoice = {
  code: string;
  text: string;
};

/**
 * Question payload returned by `GET /exams/:id` while the exam is being taken.
 * The backend intentionally strips `correctAnswerCode` and `explanation` so
 * answers cannot be inspected from the network tab.
 */
export type ExamQuestion = {
  id: string;
  jlptLevel: JlptLevel;
  section: QuestionSection;
  skill: string;
  questionType: string;
  difficulty: string;
  content: string;
  imageUrl: string | null;
  choices: ExamChoice[];
  tags: string[];
  orderInExam: number | null;
};

export type ExamDetail = Omit<Exam, 'questions'> & {
  questions: ExamQuestion[];
};

export type ExamResultItem = {
  questionId: string;
  orderInExam: number | null;
  section: QuestionSection;
  skill: string;
  content: string;
  imageUrl: string | null;
  choices: ExamChoice[];
  selectedAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

export type ExamSectionBreakdown = {
  section: string;
  total: number;
  correct: number;
  accuracy: number;
};

export type ExamSubmitResponse = {
  sessionId: string;
  examId: string;
  examTitle: string;
  jlptLevel: JlptLevel;
  score: number;
  correctCount: number;
  totalQuestions: number;
  answeredCount: number;
  timeSpent: number;
  results: ExamResultItem[];
};

export type ExamSessionResult = {
  sessionId: string;
  examId: string;
  examTitle: string;
  jlptLevel: JlptLevel;
  score: number;
  correctCount: number;
  totalQuestions: number;
  answeredCount: number;
  timeSpent: number;
  startedAt: string | null;
  completedAt: string | null;
  sections: ExamSectionBreakdown[];
  results: ExamResultItem[];
};
