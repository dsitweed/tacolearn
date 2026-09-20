'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient, handleApiError, queryKeys } from '@/libs';

interface SubmitExamData {
  answers: Array<{
    questionId: string;
    selectedAnswer: string;
  }>;
  timeSpent: number;
}

interface SubmitExamResponse {
  sessionId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpent: number;
  results: Array<{
    questionId: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
}

export function useSubmitExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      examId,
      data,
    }: {
      examId: string;
      data: SubmitExamData;
    }) => {
      try {
        const response = await apiClient.post<SubmitExamResponse>(
          `/exams/${examId}/submit`,
          data,
        );
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.practice.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.exams.detail(variables.examId),
      });
    },
  });
}
