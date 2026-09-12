import { ApiProperty } from '@nestjs/swagger';

import { AttendanceStatus } from '../prisma/client';
import { Class } from './class.entity';
import { StudentProfile } from './studentProfile.entity';

export class Attendance {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  classId: string;
  @ApiProperty({
    type: () => Class,
    required: false,
  })
  class?: Class;
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
  date: Date;
  @ApiProperty({
    enum: AttendanceStatus,
    enumName: 'AttendanceStatus',
  })
  status: AttendanceStatus;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  notes: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
