
import {JlptLevel,LessonDifficulty,QuestionSection} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Question} from './question.entity'
import {Vocabulary} from './vocabulary.entity'
import {GrammarPoint} from './grammarPoint.entity'
import {LessonProgress} from './lessonProgress.entity'


export class Lesson {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
title: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description: string  | null;
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
  nullable: true,
})
videoUrl: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
videoDurationMinutes: number  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
transcript: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
estimatedDurationMinutes: number  | null;
@ApiProperty({
  enum: LessonDifficulty,
  enumName: 'LessonDifficulty',
})
difficulty: LessonDifficulty ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
createdById: string  | null;
@ApiProperty({
  type: () => User,
  required: false,
  nullable: true,
})
createdBy?: User  | null;
@ApiProperty({
  type: () => Question,
  isArray: true,
  required: false,
})
questions?: Question[] ;
@ApiProperty({
  type: () => Vocabulary,
  isArray: true,
  required: false,
})
vocabulary?: Vocabulary[] ;
@ApiProperty({
  type: () => GrammarPoint,
  isArray: true,
  required: false,
})
grammarPoints?: GrammarPoint[] ;
@ApiProperty({
  type: () => LessonProgress,
  isArray: true,
  required: false,
})
progress?: LessonProgress[] ;
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
