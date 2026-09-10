
import {EnrollmentStatus} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Class} from './class.entity'
import {StudentProfile} from './studentProfile.entity'


export class ClassEnrollment {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
classId: string ;
@ApiProperty({
  type: () => Class,
  required: false,
})
class?: Class ;
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
  enum: EnrollmentStatus,
  enumName: 'EnrollmentStatus',
})
status: EnrollmentStatus ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
enrolledAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
droppedAt: Date  | null;
}
