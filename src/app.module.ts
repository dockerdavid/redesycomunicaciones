import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';

import { envVars } from './config';

@Module({
  imports: [
    NewsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envVars.DB_HOST,
      port: envVars.DB_PORT,
      username: envVars.DB_USER,
      password: envVars.DB_PASS,
      database: envVars.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
