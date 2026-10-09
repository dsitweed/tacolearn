/**
 * Query Key Factory for TanStack Query
 * Centralized query key management for better organization and type safety
 */

export const queryKeys = {
  // Auth queries
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },

  // Upload queries
  uploads: {
    all: ['uploads'] as const,
    presignedUrls: () => [...queryKeys.uploads.all, 'presignedUrls'] as const,
    deleteObject: () => [...queryKeys.uploads.all, 'deleteObject'] as const,
    deleteObjectsByPrefix: () =>
      [...queryKeys.uploads.all, 'deleteObjectsByPrefix'] as const,
  },

  // Exam queries
  exams: {
    all: ['exams'] as const,
    list: (level?: string) =>
      [...queryKeys.exams.all, 'list', level ?? 'all'] as const,
    detail: (id: string) => [...queryKeys.exams.all, 'detail', id] as const,
    result: (sessionId: string) =>
      [...queryKeys.exams.all, 'result', sessionId] as const,
  },

  // Practice/Questions queries
  questions: {
    all: ['questions'] as const,
  },

  // Practice queries
  practice: {
    all: ['practice'] as const,
    session: (id: string) => [...queryKeys.practice.all, id] as const,
    results: (id: string) =>
      [...queryKeys.practice.all, id, 'results'] as const,
  },
} as const;
