import { Module } from '@nestjs/common';

import { ExamsModule } from './exams/exams.module';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [QuestionsModule, ExamsModule],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
