
import {JlptLevel} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Question} from './question.entity'
import {Lesson} from './lesson.entity'


export class GrammarPoint {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
pattern: string ;
@ApiProperty({
  type: 'string',
})
englishMeaning: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
japaneseExplanation: string  | null;
@ApiProperty({
  enum: JlptLevel,
  enumName: 'JlptLevel',
  nullable: true,
})
jlptLevel: JlptLevel  | null;
@ApiProperty({
  type: 'string',
  isArray: true,
})
exampleSentences: string[] ;
@ApiProperty({
  type: () => Question,
  isArray: true,
  required: false,
})
questions?: Question[] ;
@ApiProperty({
  type: () => Lesson,
  isArray: true,
  required: false,
})
lessons?: Lesson[] ;
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
