
import {JlptLevel,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {QuestionAttempt} from './questionAttempt.entity'
import {SkillMastery} from './skillMastery.entity'
import {SrsItem} from './srsItem.entity'
import {DailyLearningPlan} from './dailyLearningPlan.entity'
import {PracticeSession} from './practiceSession.entity'
import {ClassEnrollment} from './classEnrollment.entity'
import {Attendance} from './attendance.entity'
import {LessonProgress} from './lessonProgress.entity'


export class StudentProfile {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
userId: string ;
@ApiProperty({
  type: () => User,
  required: false,
})
user?: User ;
@ApiProperty({
  enum: JlptLevel,
  enumName: 'JlptLevel',
  nullable: true,
})
jlptGoalLevel: JlptLevel  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
jlptGoalDate: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
currentReadinessScore: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
totalPracticeTimeHours: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
bio: string  | null;
@ApiProperty({
  type: () => QuestionAttempt,
  isArray: true,
  required: false,
})
attempts?: QuestionAttempt[] ;
@ApiProperty({
  type: () => SkillMastery,
  isArray: true,
  required: false,
})
skillMastery?: SkillMastery[] ;
@ApiProperty({
  type: () => SrsItem,
  isArray: true,
  required: false,
})
srsItems?: SrsItem[] ;
@ApiProperty({
  type: () => DailyLearningPlan,
  isArray: true,
  required: false,
})
dailyPlans?: DailyLearningPlan[] ;
@ApiProperty({
  type: () => PracticeSession,
  isArray: true,
  required: false,
})
practiceSessions?: PracticeSession[] ;
@ApiProperty({
  type: () => ClassEnrollment,
  isArray: true,
  required: false,
})
enrollments?: ClassEnrollment[] ;
@ApiProperty({
  type: () => Attendance,
  isArray: true,
  required: false,
})
attendances?: Attendance[] ;
@ApiProperty({
  type: () => LessonProgress,
  isArray: true,
  required: false,
})
lessonProgress?: LessonProgress[] ;
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
