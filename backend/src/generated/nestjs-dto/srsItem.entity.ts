
import {ConfidenceLevel,Prisma,SrsContentType,SrsStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {StudentProfile} from './studentProfile.entity'


export class SrsItem {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
studentId: string ;
@ApiProperty({
  type: () => StudentProfile,
  required: false,
})
student?: StudentProfile ;
@ApiProperty({
  type: 'string',
})
contentId: string ;
@ApiProperty({
  enum: SrsContentType,
  enumName: 'SrsContentType',
})
contentType: SrsContentType ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
stage: number ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
easeFactor: Prisma.Decimal ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
intervalDays: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
reviewCount: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
lastReviewedAt: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
nextReviewAt: Date  | null;
@ApiProperty({
  enum: ConfidenceLevel,
  enumName: 'ConfidenceLevel',
  nullable: true,
})
lastConfidenceRating: ConfidenceLevel  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
  nullable: true,
})
averageConfidence: Prisma.Decimal  | null;
@ApiProperty({
  enum: SrsStatus,
  enumName: 'SrsStatus',
})
status: SrsStatus ;
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
