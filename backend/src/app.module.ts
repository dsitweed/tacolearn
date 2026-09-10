import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AuthModule } from 'auth/auth.module';
import { JwtAuthGuard, RolesGuard } from 'common/guards';
import { validateEnv } from 'config';
import { UsersModule } from 'users/users.module';

import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './storage/storage.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    UploadsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
