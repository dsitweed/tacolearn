
import {JlptLevel,SessionStatus,SessionType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {StudentProfile} from './studentProfile.entity'
import {QuestionAttempt} from './questionAttempt.entity'


export class PracticeSession {
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
  enum: SessionType,
  enumName: 'SessionType',
})
sessionType: SessionType ;
@ApiProperty({
  enum: JlptLevel,
  enumName: 'JlptLevel',
  nullable: true,
})
jlptLevel: JlptLevel  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
skill: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
totalQuestions: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
questionsCompleted: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
correctAnswers: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
totalTimeSeconds: number  | null;
@ApiProperty({
  enum: SessionStatus,
  enumName: 'SessionStatus',
})
status: SessionStatus ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
startedAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
completedAt: Date  | null;
@ApiProperty({
  type: () => QuestionAttempt,
  isArray: true,
  required: false,
})
attempts?: QuestionAttempt[] ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
}
