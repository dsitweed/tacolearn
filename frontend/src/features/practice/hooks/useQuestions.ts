import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/libs/apiClient';
import { queryKeys } from '@/libs/queryKeys';
import { ApiResponse } from '@/types';

export interface Question {
  id: string;
  jlptLevel: string;
  section: string;
  skill: string;
  questionType: string;
  difficulty: string;
  content: string;
  imageUrl: string | null;
  choices: Array<{ code: string; text: string }>;
  correctAnswerCode: string;
  explanation: string;
  tags: string[];
  attemptCount: number;
  correctCount: number;
}

export interface PracticeSession {
  id: string;
  studentId: string;
  sessionType: string;
  examId: string | null;
  jlptLevel: string | null;
  skill: string | null;
  totalQuestions: number;
  questionsCompleted: number;
  correctAnswers: number;
  totalTimeSeconds: number | null;
  status: string;
  startedAt: string;
  completedAt: string | null;
}

export interface QuestionAttempt {
  id: string;
  studentId: string;
  questionId: string;
  sessionId: string | null;
  studentAnswerCode: string;
  isCorrect: boolean;
  timeSpentSeconds: number | null;
}

export interface PracticeSessionResult {
  session: PracticeSession;
  totalQuestions: number;
  questionsCompleted: number;
  correctAnswers: number;
  accuracy: number;
}

export function useQuestions(level: string, section: string, count?: number) {
  return useQuery<Question[]>({
    queryKey: [...queryKeys.questions.all, level, section, count],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Question[]>>(
        '/questions',
        {
          params: { level, section, limit: count || 10 },
        },
      );
      return response.data as unknown as Question[];
    },
    enabled: !!level && !!section,
  });
}

export function useRandomQuestions(
  level: string,
  section: string,
  count?: number,
) {
  return useQuery<Question[]>({
    queryKey: [...queryKeys.questions.all, level, section, count, 'random'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Question[]>>(
        '/questions/random',
        {
          params: { level, section, count: count || 10 },
        },
      );
      return response.data as unknown as Question[];
    },
    enabled: false,
  });
}

export function useQuestionById(id: string) {
  return useQuery<Question>({
    queryKey: [...queryKeys.questions.all, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Question>>(
        `/questions/${id}`,
      );
      return response.data as unknown as Question;
    },
    enabled: !!id,
  });
}

export function usePracticeSessionById(id: string) {
  return useQuery<PracticeSession>({
    queryKey: [...queryKeys.practice.all, id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<PracticeSession>>(
        `/practice/sessions/${id}`,
      );
      return response.data as unknown as PracticeSession;
    },
    enabled: !!id,
  });
}

export function useCreatePracticeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      sessionType: string;
      jlptLevel?: string;
      skill?: string;
      totalQuestions: number;
      questionIds: string[];
      studentId: string;
    }) => {
      const response = await apiClient.post<ApiResponse<PracticeSession>>(
        '/practice/sessions',
        data,
      );
      return response.data as unknown as PracticeSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.practice.all });
    },
  });
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      sessionId: string;
      questionId: string;
      answerCode: string;
      timeSpentSeconds: number;
    }) => {
      const response = await apiClient.post<ApiResponse>(
        `/practice/sessions/${data.sessionId}/answers`,
        {
          questionId: data.questionId,
          answerCode: data.answerCode,
          timeSpentSeconds: data.timeSpentSeconds,
        },
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.practice.all, variables.sessionId],
      });
    },
  });
}

export function useCompletePracticeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await apiClient.post<ApiResponse>(
        `/practice/sessions/${sessionId}/complete`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.practice.all });
    },
  });
}

export function usePracticeResults(sessionId: string) {
  return useQuery<PracticeSessionResult>({
    queryKey: [...queryKeys.practice.all, sessionId, 'results'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<PracticeSessionResult>>(
        `/practice/sessions/${sessionId}/results`,
      );
      return response.data as unknown as PracticeSessionResult;
    },
    enabled: !!sessionId,
  });
}
