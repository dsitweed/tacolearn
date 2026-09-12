import { ApiProperty } from '@nestjs/swagger';

import { PlanStatus, Prisma } from '../prisma/client';
import { StudentProfile } from './studentProfile.entity';

export class DailyLearningPlan {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  studentId: string;
  @ApiProperty({
    type: () => StudentProfile,
    required: false,
  })
  student?: StudentProfile;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  planDate: Date;
  @ApiProperty({
    type: () => Object,
  })
  activities: Prisma.JsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  totalTimeMinutes: number | null;
  @ApiProperty({
    enum: PlanStatus,
    enumName: 'PlanStatus',
  })
  status: PlanStatus;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  startedAt: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  completedAt: Date | null;
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
