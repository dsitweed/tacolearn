
import {JlptLevel,Prisma,QuestionSection,TrendDirection} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {StudentProfile} from './studentProfile.entity'


export class SkillMastery {
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
  enum: JlptLevel,
  enumName: 'JlptLevel',
})
jlptLevel: JlptLevel ;
@ApiProperty({
  enum: QuestionSection,
  enumName: 'QuestionSection',
  nullable: true,
})
section: QuestionSection  | null;
@ApiProperty({
  type: 'string',
})
skill: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
correctAnswers: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
totalAttempts: number ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
masteryPercentage: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
firstAttemptedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastAttemptedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  nullable: true,
})
weeklyProgress: Prisma.Decimal  | null;
@ApiProperty({
  enum: TrendDirection,
  enumName: 'TrendDirection',
  nullable: true,
})
trendDirection: TrendDirection  | null;
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
