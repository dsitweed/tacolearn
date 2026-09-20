'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient, handleApiError, queryKeys } from '@/libs';
import { Exam } from '@/types';

export function useExams(level?: string) {
  return useQuery({
    queryKey: queryKeys.exams.list(),
    queryFn: async () => {
      const response = level
        ? await apiClient.get<Exam[]>('/exams', { params: { level } })
        : await apiClient.get<Exam[]>('/exams');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useExam(id: string) {
  return useQuery({
    queryKey: queryKeys.exams.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<Exam>(`/exams/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });
}
