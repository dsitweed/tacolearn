
import {LessonProgressStatus,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {StudentProfile} from './studentProfile.entity'
import {Lesson} from './lesson.entity'


export class LessonProgress {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
studentId: string ;
@ApiProperty({
  type: () => StudentProfile,
  required: false,
})
student?: StudentProfile ;
@ApiProperty({
  type: 'string',
})
lessonId: string ;
@ApiProperty({
  type: () => Lesson,
  required: false,
})
lesson?: Lesson ;
@ApiProperty({
  enum: LessonProgressStatus,
  enumName: 'LessonProgressStatus',
})
status: LessonProgressStatus ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  nullable: true,
})
quizScore: Prisma.Decimal  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
startedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
videoWatchedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
quizCompletedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
completedAt: Date  | null;
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
