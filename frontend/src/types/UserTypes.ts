import { UserRole } from '@/generated/model';

// Exam-related types are generated from the backend OpenAPI schema (see
// `src/generated/model`). Re-exported here so `@/types` stays the single import
// surface used across the app.
export type { Exam } from '@/generated/model/exam';
export { ExamType } from '@/generated/model/examType';
export { JlptLevel } from '@/generated/model/jlptLevel';

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
