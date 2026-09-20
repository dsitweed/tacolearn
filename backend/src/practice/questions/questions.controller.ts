import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'core/common/decorators';
import { JwtAuthGuard } from 'core/common/guards';
import { Question } from 'generated/nestjs-dto';

import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get questions by level and section' })
  @ApiResponse({
    status: 200,
    description: 'Questions retrieved',
    type: [Question],
  })
  async getQuestions(
    @Query('level') level: string,
    @Query('section') section: string,
    @Query('limit') limit: string,
    @CurrentUser() user: any,
  ) {
    return this.questionsService.findManyByLevelAndSection(
      level,
      section,
      parseInt(limit || '10', 10),
    );
  }

  @Get('random')
  @ApiOperation({ summary: 'Get random questions by level and section' })
  @ApiResponse({
    status: 200,
    description: 'Random questions retrieved',
    type: [Question],
  })
  async getRandomQuestions(
    @Query('level') level: string,
    @Query('section') section: string,
    @Query('count') count: string,
    @CurrentUser() user: any,
  ) {
    return this.questionsService.findRandomByLevelAndSection(
      level,
      section,
      parseInt(count || '10', 10),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved',
    type: Question,
  })
  async getQuestion(@Param('id') id: string) {
    const question = await this.questionsService.findOne(id);
    if (!question) {
      throw { statusCode: 404, message: 'Question not found' };
    }
    return question;
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get question statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved' })
  async getStats(@Query('level') level?: string) {
    return this.questionsService.getStats(level);
  }
}
