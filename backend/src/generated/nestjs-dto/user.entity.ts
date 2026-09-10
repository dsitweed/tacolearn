import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../prisma/client';
import { Account } from './account.entity';
import { Notification } from './notification.entity';
import { Session } from './session.entity';
import { UserProfile } from './userProfile.entity';

export class User {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
  })
  role: UserRole;
  @ApiProperty({
    type: 'boolean',
  })
  isActive: boolean;
  @ApiProperty({
    type: () => UserProfile,
    required: false,
    nullable: true,
  })
  profile?: UserProfile | null;
  @ApiProperty({
    type: () => Session,
    isArray: true,
    required: false,
  })
  sessions?: Session[];
  @ApiProperty({
    type: () => Account,
    isArray: true,
    required: false,
  })
  accounts?: Account[];
  @ApiProperty({
    type: () => Notification,
    isArray: true,
    required: false,
  })
  notifications?: Notification[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
