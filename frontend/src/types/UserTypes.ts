import { UserRole } from '@/generated/model';

export enum ExamType {
  OFFICIAL = 'OFFICIAL',
  MOCK = 'MOCK',
}

export enum JlptLevel {
  N1 = 'N1',
  N2 = 'N2',
  N3 = 'N3',
  N4 = 'N4',
  N5 = 'N5',
}

export interface Exam {
  id: string;
  title: string;
  description: string | null;
  jlptLevel: JlptLevel;
  type: ExamType;
  year: number | null;
  month: number | null;
  durationMinutes: number | null;
  totalQuestions: number;
  isPublished: boolean;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
}

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
