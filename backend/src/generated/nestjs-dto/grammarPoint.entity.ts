import { ApiProperty } from '@nestjs/swagger';

import { JlptLevel } from '../prisma/client';
import { Lesson } from './lesson.entity';
import { Question } from './question.entity';

export class GrammarPoint {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  pattern: string;
  @ApiProperty({
    type: 'string',
  })
  vietnameseMeaning: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  englishMeaning: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  japaneseExplanation: string | null;
  @ApiProperty({
    enum: JlptLevel,
    enumName: 'JlptLevel',
    nullable: true,
  })
  jlptLevel: JlptLevel | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  exampleSentences: string[];
  @ApiProperty({
    type: () => Question,
    isArray: true,
    required: false,
  })
  questions?: Question[];
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
