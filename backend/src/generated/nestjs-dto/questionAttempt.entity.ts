
import {ConfidenceLevel,MistakeType} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {StudentProfile} from './studentProfile.entity'
import {Question} from './question.entity'
import {PracticeSession} from './practiceSession.entity'


export class QuestionAttempt {
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
questionId: string ;
@ApiProperty({
  type: () => Question,
  required: false,
})
question?: Question ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
sessionId: string  | null;
@ApiProperty({
  type: () => PracticeSession,
  required: false,
  nullable: true,
})
session?: PracticeSession  | null;
@ApiProperty({
  type: 'string',
})
studentAnswerCode: string ;
@ApiProperty({
  type: 'boolean',
})
isCorrect: boolean ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
timeSpentSeconds: number  | null;
@ApiProperty({
  enum: ConfidenceLevel,
  enumName: 'ConfidenceLevel',
  nullable: true,
})
confidenceLevel: ConfidenceLevel  | null;
@ApiProperty({
  type: 'boolean',
})
hintUsed: boolean ;
@ApiProperty({
  type: 'boolean',
})
markedForReview: boolean ;
@ApiProperty({
  enum: MistakeType,
  enumName: 'MistakeType',
  nullable: true,
})
mistakeType: MistakeType  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
attemptedAt: Date ;
}
