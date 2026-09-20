import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'core/common/decorators';
import { JwtAuthGuard } from 'core/common/guards';
import { PracticeSession } from 'generated/nestjs-dto';

import { PracticeService } from './practice.service';

@ApiTags('Practice')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post('sessions')
  @ApiOperation({ summary: 'Create a new practice session' })
  @ApiResponse({
    status: 201,
    description: 'Practice session created',
    type: PracticeSession,
  })
  async createSession(
    @Body()
    body: {
      sessionType: string;
      jlptLevel?: string;
      skill?: string;
      examId?: string;
      totalQuestions: number;
      questionIds: string[];
      studentId: string;
    },
    @CurrentUser() user: any,
  ) {
    return this.practiceService.createSession({
      ...body,
      studentId: user.id,
      questionIds: body.questionIds || [],
    });
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: 'Get practice session by ID' })
  @ApiResponse({
    status: 200,
    description: 'Session retrieved',
    type: PracticeSession,
  })
  async getSession(@Param('id') id: string) {
    return this.practiceService.findSession(id);
  }

  @Post('sessions/:id/answers')
  @ApiOperation({ summary: 'Submit an answer for a question' })
  @ApiResponse({ status: 200, description: 'Answer submitted' })
  async submitAnswer(
    @Param('id') id: string,
    @Body()
    body: {
      questionId: string;
      answerCode: string;
      timeSpentSeconds: number;
    },
    @CurrentUser() user: any,
  ) {
    return this.practiceService.submitAnswer({
      ...body,
      sessionId: id,
    });
  }

  @Post('sessions/:id/complete')
  @ApiOperation({ summary: 'Complete a practice session' })
  @ApiResponse({ status: 200, description: 'Session completed' })
  async completeSession(@Param('id') id: string) {
    return this.practiceService.completeSession(id);
  }

  @Get('sessions/:id/results')
  @ApiOperation({ summary: 'Get practice session results' })
  @ApiResponse({ status: 200, description: 'Results retrieved' })
  async getResults(@Param('id') id: string) {
    return this.practiceService.getSessionResults(id);
  }
}
