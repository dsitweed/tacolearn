
import {UserRole} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {UserProfile} from './userProfile.entity'
import {StudentProfile} from './studentProfile.entity'
import {TeacherProfile} from './teacherProfile.entity'
import {Session} from './session.entity'
import {Account} from './account.entity'
import {Notification} from './notification.entity'
import {School} from './school.entity'
import {Question} from './question.entity'
import {Lesson} from './lesson.entity'
import {Announcement} from './announcement.entity'


export class User {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
email: string ;
@ApiProperty({
  enum: UserRole,
  enumName: 'UserRole',
})
role: UserRole ;
@ApiProperty({
  type: 'boolean',
})
isActive: boolean ;
@ApiProperty({
  type: () => UserProfile,
  required: false,
  nullable: true,
})
profile?: UserProfile  | null;
@ApiProperty({
  type: () => StudentProfile,
  required: false,
  nullable: true,
})
studentProfile?: StudentProfile  | null;
@ApiProperty({
  type: () => TeacherProfile,
  required: false,
  nullable: true,
})
teacherProfile?: TeacherProfile  | null;
@ApiProperty({
  type: () => Session,
  isArray: true,
  required: false,
})
sessions?: Session[] ;
@ApiProperty({
  type: () => Account,
  isArray: true,
  required: false,
})
accounts?: Account[] ;
@ApiProperty({
  type: () => Notification,
  isArray: true,
  required: false,
})
notifications?: Notification[] ;
@ApiProperty({
  type: () => School,
  isArray: true,
  required: false,
})
schoolsOwned?: School[] ;
@ApiProperty({
  type: () => Question,
  isArray: true,
  required: false,
})
questionsCreated?: Question[] ;
@ApiProperty({
  type: () => Lesson,
  isArray: true,
  required: false,
})
lessonsCreated?: Lesson[] ;
@ApiProperty({
  type: () => Announcement,
  isArray: true,
  required: false,
})
announcementsCreated?: Announcement[] ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastLoginAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
}
