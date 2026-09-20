import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { User } from '@/generated/model';
import { apiClient } from '@/libs/apiClient';

/**
 * Auth Store - Simplified for httpOnly cookie authentication
 *
 * Tokens are stored in httpOnly cookies (managed by backend),
 * so we only store user info in Zustand for UI state.
 *
 * Authentication is determined by:
 * - Client-side: user object presence (after successful login)
 * - Server-side: cookie presence (checked in middleware/serverApiClient)
 */
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  login: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  setHydrated: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isHydrated: false,

        login: (user) => {
          set({
            user,
            isAuthenticated: true,
          });
        },

        updateUser: (userData) => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
            });
          }
        },

        setHydrated: () => {
          set({ isHydrated: true });
        },

        checkAuth: async () => {
          try {
            const response = await apiClient.get<User>('/users/me');
            if (response.data) {
              set({
                user: response.data,
                isAuthenticated: true,
              });
            }
          } catch {
            set({ isAuthenticated: false, user: null });
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          // Mark as hydrated after rehydration completes
          state?.setHydrated();
        },
      },
    ),
    {
      name: 'AuthStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

/**
 * Clear auth state and redirect to login
 */
export const authLogout = () => {
  localStorage.removeItem('auth-storage');
  if (typeof window !== 'undefined') {
    window.location.replace('/login');
  }
};
