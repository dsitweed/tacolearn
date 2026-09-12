import { ApiProperty } from '@nestjs/swagger';

import { Class } from './class.entity';
import { User } from './user.entity';

export class TeacherProfile {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  specialization: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  bio: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  yearsOfExperience: number | null;
  @ApiProperty({
    type: () => Class,
    isArray: true,
    required: false,
  })
  classes?: Class[];
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
