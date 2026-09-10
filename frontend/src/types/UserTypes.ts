import { UserRole } from '@/generated/model';

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatar?: string | null;
  dateOfBirth?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  profile?: UserProfile | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
