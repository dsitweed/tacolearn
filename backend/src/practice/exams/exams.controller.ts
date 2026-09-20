import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'core/common/decorators';
import { JwtAuthGuard } from 'core/common/guards';
import { Exam } from 'generated/nestjs-dto';

import { SubmitExamDto } from './dto/submit-exam.dto';
import { ExamsService } from './exams.service';

@ApiTags('Exams')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: 'List published exams' })
  @ApiResponse({
    status: 200,
    description: 'Exams retrieved',
    type: [Exam],
  })
  async getExams(@CurrentUser() user: any, @Query('level') level?: string) {
    return this.examsService.findPublishedExams(level);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam by ID' })
  @ApiResponse({
    status: 200,
    description: 'Exam retrieved',
    type: Exam,
  })
  async getExamById(@Param('id') id: string) {
    const exam = await this.examsService.findExamById(id);
    if (!exam) {
      throw { statusCode: 404, message: 'Exam not found' };
    }
    return exam;
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit exam answers' })
  @ApiResponse({
    status: 200,
    description: 'Exam submitted successfully',
  })
  async submitExam(
    @Param('id') id: string,
    @Body() submitExamDto: SubmitExamDto,
    @CurrentUser() user: any,
  ) {
    return this.examsService.submitExam(id, submitExamDto, user);
  }
}
