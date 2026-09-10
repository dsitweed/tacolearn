
import {SubscriptionPlan,SubscriptionStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Class} from './class.entity'
import {Announcement} from './announcement.entity'


export class School {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
ownerId: string ;
@ApiProperty({
  type: () => User,
  required: false,
})
owner?: User ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
description: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
logo: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
address: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
city: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
country: string  | null;
@ApiProperty({
  enum: SubscriptionPlan,
  enumName: 'SubscriptionPlan',
})
subscriptionPlan: SubscriptionPlan ;
@ApiProperty({
  enum: SubscriptionStatus,
  enumName: 'SubscriptionStatus',
})
subscriptionStatus: SubscriptionStatus ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
maxStudents: number  | null;
@ApiProperty({
  type: 'boolean',
})
isActive: boolean ;
@ApiProperty({
  type: () => Class,
  isArray: true,
  required: false,
})
classes?: Class[] ;
@ApiProperty({
  type: () => Announcement,
  isArray: true,
  required: false,
})
announcements?: Announcement[] ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
}
