import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../prisma/client';
import { Account } from './account.entity';
import { Announcement } from './announcement.entity';
import { Exam } from './exam.entity';
import { Lesson } from './lesson.entity';
import { Notification } from './notification.entity';
import { Question } from './question.entity';
import { School } from './school.entity';
import { Session } from './session.entity';
import { StudentProfile } from './studentProfile.entity';
import { TeacherProfile } from './teacherProfile.entity';
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
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  emailVerifiedAt: Date | null;
  @ApiProperty({
    type: () => UserProfile,
    required: false,
    nullable: true,
  })
  profile?: UserProfile | null;
  @ApiProperty({
    type: () => StudentProfile,
    required: false,
    nullable: true,
  })
  studentProfile?: StudentProfile | null;
  @ApiProperty({
    type: () => TeacherProfile,
    required: false,
    nullable: true,
  })
  teacherProfile?: TeacherProfile | null;
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
    type: () => School,
    isArray: true,
    required: false,
  })
  schoolsOwned?: School[];
  @ApiProperty({
    type: () => Exam,
    isArray: true,
    required: false,
  })
  examsCreated?: Exam[];
  @ApiProperty({
    type: () => Question,
    isArray: true,
    required: false,
  })
  questionsCreated?: Question[];
  @ApiProperty({
    type: () => Lesson,
    isArray: true,
    required: false,
  })
  lessonsCreated?: Lesson[];
  @ApiProperty({
    type: () => Announcement,
    isArray: true,
    required: false,
  })
  announcementsCreated?: Announcement[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastLoginAt: Date | null;
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
