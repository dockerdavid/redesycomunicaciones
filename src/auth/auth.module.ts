import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { Users } from './entities/user.entity';
import { AuthService } from './auth.service';

import { envVars } from 'src/config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: envVars.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),

    TypeOrmModule.forFeature([Users])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, TypeOrmModule, JwtModule]
})

export class AuthModule { }
