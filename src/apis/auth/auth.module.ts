import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from './strategies/jwt-social-google.strategy';
import { JwtNaverStrategy } from './strategies/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from './strategies/jwt-social-kakao.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule, //
  ],
  controllers: [
    AuthController, //
  ],
  providers: [
    JwtGoogleStrategy, //
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
})
export class AuthModule {}
