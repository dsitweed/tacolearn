import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { JwtAuthGuard, RolesGuard } from 'core/common/guards';
import { validateEnv } from 'core/config';
import { CoreModule } from 'core/core.module';
import { IdentifyModule } from 'identify/identify.module';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';
import { PracticeModule } from 'practice/practice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    CoreModule,
    IdentifyModule,
    InfrastructureModule,
    PracticeModule,
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
