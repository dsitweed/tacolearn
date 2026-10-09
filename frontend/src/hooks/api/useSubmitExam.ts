'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient, handleApiError, queryKeys } from '@/libs';
import { ExamSubmitResponse } from '@/types';

export interface SubmitExamData {
  answers: Array<{
    questionId: string;
    selectedAnswer: string;
  }>;
  timeSpent: number;
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
      const response = await apiClient.post<ExamSubmitResponse>(
        `/exams/${examId}/submit`,
        data,
      );
      return response.data;
    },
    onError: handleApiError,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.exams.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.exams.detail(variables.examId),
      });
    },
  });
}
