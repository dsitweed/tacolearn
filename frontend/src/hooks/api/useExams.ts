'use client';

import { useQuery } from '@tanstack/react-query';

import { Exam } from '@/generated/model/exam';
import { apiClient, queryKeys } from '@/libs';
import { ExamDetail, ExamSessionResult } from '@/types';

export function useExams(level?: string) {
  return useQuery<Exam[]>({
    queryKey: queryKeys.exams.list(level),
    queryFn: async () => {
      const response = await apiClient.get<Exam[]>(
        '/exams',
        level ? { params: { level } } : undefined,
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useExam(id: string) {
  return useQuery<ExamDetail>({
    queryKey: queryKeys.exams.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<ExamDetail>(`/exams/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });
}

export function useExamSessionResult(sessionId: string) {
  return useQuery<ExamSessionResult>({
    queryKey: queryKeys.exams.result(sessionId),
    queryFn: async () => {
      const response = await apiClient.get<ExamSessionResult>(
        `/exams/sessions/${sessionId}`,
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!sessionId,
  });
}
