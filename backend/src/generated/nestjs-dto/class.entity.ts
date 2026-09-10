
import {ClassStatus,JlptLevel,Prisma} from '../prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {School} from './school.entity'
import {TeacherProfile} from './teacherProfile.entity'
import {ClassEnrollment} from './classEnrollment.entity'
import {Attendance} from './attendance.entity'
import {Announcement} from './announcement.entity'


export class Class {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
})
schoolId: string ;
@ApiProperty({
  type: () => School,
  required: false,
})
school?: School ;
@ApiProperty({
  type: 'string',
})
teacherId: string ;
@ApiProperty({
  type: () => TeacherProfile,
  required: false,
})
teacher?: TeacherProfile ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  enum: JlptLevel,
  enumName: 'JlptLevel',
})
jlptLevel: JlptLevel ;
@ApiProperty({
  type: () => Object,
  nullable: true,
})
schedule: Prisma.JsonValue  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
maxStudents: number ;
@ApiProperty({
  enum: ClassStatus,
  enumName: 'ClassStatus',
})
status: ClassStatus ;
@ApiProperty({
  type: () => ClassEnrollment,
  isArray: true,
  required: false,
})
enrollments?: ClassEnrollment[] ;
@ApiProperty({
  type: () => Attendance,
  isArray: true,
  required: false,
})
attendances?: Attendance[] ;
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
