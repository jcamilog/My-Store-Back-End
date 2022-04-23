import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { localStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import config from '../config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          }
        }
      }
    }),
    CompanyModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    localStrategy,
    jwtStrategy
  ]
})
export class AuthModule {}
