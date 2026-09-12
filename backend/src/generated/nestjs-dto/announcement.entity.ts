import { ApiProperty } from '@nestjs/swagger';

import { Class } from './class.entity';
import { School } from './school.entity';
import { User } from './user.entity';

export class Announcement {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  schoolId: string | null;
  @ApiProperty({
    type: () => School,
    required: false,
    nullable: true,
  })
  school?: School | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  classId: string | null;
  @ApiProperty({
    type: () => Class,
    required: false,
    nullable: true,
  })
  class?: Class | null;
  @ApiProperty({
    type: 'string',
  })
  createdById: string;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  createdBy?: User;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  postedAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  expiresAt: Date | null;
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
