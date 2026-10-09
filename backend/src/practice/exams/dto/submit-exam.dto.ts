import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class AnswerDto {
  @ApiProperty({ description: 'Question ID' })
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @ApiProperty({ description: 'Selected answer code, e.g. "A"' })
  @IsNotEmpty()
  @IsString()
  selectedAnswer: string;
}

export class SubmitExamDto {
  @ApiProperty({
    description: 'Answers for the questions that were answered',
    type: [AnswerDto],
  })
  @IsArray()
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @ApiProperty({ description: 'Time spent in seconds', minimum: 0 })
  @IsInt()
  @Min(0)
  timeSpent: number;
}
