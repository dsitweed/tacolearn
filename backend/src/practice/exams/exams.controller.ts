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
import type { User } from 'generated/prisma/client';

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
  async getExams(@Query('level') level?: string) {
    return this.examsService.findPublishedExams(level);
  }

  @Get('sessions/:sessionId')
  @ApiOperation({ summary: 'Get the result of a submitted exam session' })
  @ApiResponse({
    status: 200,
    description: 'Exam session result retrieved',
  })
  async getSessionResult(
    @Param('sessionId') sessionId: string,
    @CurrentUser() user: User,
  ) {
    return this.examsService.findSessionResult(sessionId, user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an exam with its questions (answers excluded)',
  })
  @ApiResponse({
    status: 200,
    description: 'Exam retrieved',
  })
  async getExamById(@Param('id') id: string) {
    return this.examsService.findExamById(id);
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
    @CurrentUser() user: User,
  ) {
    return this.examsService.submitExam(id, submitExamDto, user);
  }
}
