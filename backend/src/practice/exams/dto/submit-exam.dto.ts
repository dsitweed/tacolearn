import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @ApiProperty({ description: 'Question ID' })
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ description: 'Selected answer' })
  @IsNotEmpty()
  selectedAnswer: string;
}

export class SubmitExamDto {
  @ApiProperty({
    description: 'Answers for each question',
    type: [AnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @ApiProperty({ description: 'Time spent in seconds' })
  @IsNotEmpty()
  timeSpent: number;
}
