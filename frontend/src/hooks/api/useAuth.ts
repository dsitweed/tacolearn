import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  LoginAuthDto,
  RegisterAuthDto,
  UpdatePasswordDto,
  UpdateUserProfileDto,
  User,
} from '@/generated/model';
import { apiClient, handleApiError, queryKeys } from '@/libs';
import { authLogout, useAuthStore } from '@/stores/authStore';

// Auth API functions
const authApi = {
  login: async (data: LoginAuthDto) => {
    const response = await apiClient.post<User>('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterAuthDto) => {
    const response = await apiClient.post<User>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout', {});
  },

  getProfile: async () => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateUserProfileDto) => {
    const response = await apiClient.patch<User>('/users/me', data);
    return response.data;
  },

  changePassword: async (data: UpdatePasswordDto) => {
    const response = await apiClient.post<User>(
      '/users/me/change-password',
      data,
    );
    return response.data;
  },

  googleLogin: async () => {
    const response = await apiClient.post<null>('/auth/google-login');
    return response.data;
  },
};

// Hooks
export function useLogin() {
  const queryClient = useQueryClient();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      login(user);
      queryClient.setQueryData(queryKeys.auth.profile(), user);
    },
    onError: handleApiError,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    onError: handleApiError,
  });
}

export function useProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.profile(), data);
      updateUser(data);
    },
    onError: handleApiError,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: authApi.changePassword,
    onError: handleApiError,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      authLogout();
    },
  });
}

export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/v1/auth/google`;
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: handleApiError,
  });
}
