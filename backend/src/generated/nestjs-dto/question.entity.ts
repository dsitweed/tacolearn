import { ApiProperty } from '@nestjs/swagger';

import {
  Difficulty,
  JlptLevel,
  Prisma,
  QuestionSection,
  QuestionSource,
  QuestionType,
} from '../prisma/client';
import { Exam } from './exam.entity';
import { GrammarPoint } from './grammarPoint.entity';
import { Lesson } from './lesson.entity';
import { QuestionAttempt } from './questionAttempt.entity';
import { User } from './user.entity';
import { Vocabulary } from './vocabulary.entity';

export class Question {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    enum: JlptLevel,
    enumName: 'JlptLevel',
  })
  jlptLevel: JlptLevel;
  @ApiProperty({
    enum: QuestionSection,
    enumName: 'QuestionSection',
  })
  section: QuestionSection;
  @ApiProperty({
    type: 'string',
  })
  skill: string;
  @ApiProperty({
    enum: QuestionType,
    enumName: 'QuestionType',
  })
  questionType: QuestionType;
  @ApiProperty({
    enum: Difficulty,
    enumName: 'Difficulty',
  })
  difficulty: Difficulty;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  imageUrl: string | null;
  @ApiProperty({
    type: () => Object,
  })
  choices: Prisma.JsonValue;
  @ApiProperty({
    type: 'string',
  })
  correctAnswerCode: string;
  @ApiProperty({
    type: 'string',
  })
  explanation: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  tags: string[];
  @ApiProperty({
    type: 'string',
    format: 'Decimal.js',
    nullable: true,
  })
  difficultyIndex: Prisma.Decimal | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  attemptCount: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  correctCount: number;
  @ApiProperty({
    enum: QuestionSource,
    enumName: 'QuestionSource',
  })
  source: QuestionSource;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  sourceReference: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  examId: string | null;
  @ApiProperty({
    type: () => Exam,
    required: false,
    nullable: true,
  })
  exam?: Exam | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  orderInExam: number | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  createdById: string | null;
  @ApiProperty({
    type: () => User,
    required: false,
    nullable: true,
  })
  createdBy?: User | null;
  @ApiProperty({
    type: () => QuestionAttempt,
    isArray: true,
    required: false,
  })
  attempts?: QuestionAttempt[];
  @ApiProperty({
    type: () => Vocabulary,
    isArray: true,
    required: false,
  })
  vocabulary?: Vocabulary[];
  @ApiProperty({
    type: () => GrammarPoint,
    isArray: true,
    required: false,
  })
  grammarPoints?: GrammarPoint[];
  @ApiProperty({
    type: () => Lesson,
    isArray: true,
    required: false,
  })
  lessons?: Lesson[];
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
