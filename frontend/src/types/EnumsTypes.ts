// Runtime enum objects + derived union types

// TODO: remove type defined in FE use all Type of generated from BE schema
export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const NotificationType = {
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  SYSTEM: 'SYSTEM',
} as const;
export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
