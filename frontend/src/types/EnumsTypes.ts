// Runtime enum objects + derived union types

// TODO: remove type defined in FE use all Type of generated from BE schema
export const UserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const NotificationType = {
  PRACTICE_REMINDER: 'PRACTICE_REMINDER',
  ACHIEVEMENT: 'ACHIEVEMENT',
  WEAK_AREA_ALERT: 'WEAK_AREA_ALERT',
  CLASS_ANNOUNCEMENT: 'CLASS_ANNOUNCEMENT',
  MESSAGE: 'MESSAGE',
  SYSTEM: 'SYSTEM',
} as const;
export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
