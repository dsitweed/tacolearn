import { ApiProperty } from '@nestjs/swagger';

import { ExamType, JlptLevel } from '../prisma/client';
import { PracticeSession } from './practiceSession.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

export class Exam {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    enum: JlptLevel,
    enumName: 'JlptLevel',
  })
  jlptLevel: JlptLevel;
  @ApiProperty({
    enum: ExamType,
    enumName: 'ExamType',
  })
  type: ExamType;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  year: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  month: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  durationMinutes: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  totalQuestions: number;
  @ApiProperty({
    type: 'boolean',
  })
  isPublished: boolean;
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
    type: () => Question,
    isArray: true,
    required: false,
  })
  questions?: Question[];
  @ApiProperty({
    type: () => PracticeSession,
    isArray: true,
    required: false,
  })
  sessions?: PracticeSession[];
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
