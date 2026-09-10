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
} as const;
