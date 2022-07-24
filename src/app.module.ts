import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from './shared/filters/httpException.filter';
import { PermissionsGuard } from './shared/auth/guards/permission.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './shared/auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './shared/auth/auth.module';
import { RepoModule } from './repo/repo.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config/.development.env',
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    AdminModule,
    RepoModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
  controllers: [AppController],
})
export class AppModule {}
