import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { SignUpsModule } from '../signUp/signUps.module';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from '../auth/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    SignUpsModule,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    UsersResolver, //
    UsersService,
  ],
})
export class UsersModule {}
