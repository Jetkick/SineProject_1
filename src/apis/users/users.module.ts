import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { SignUpModule } from '../signUp/signUp.module';

@Module({
  imports: [
    JwtModule.register({}), //
    SignUpModule,
  ],
  providers: [
    UsersResolver, //
    UsersService,
  ],
})
export class UsersModule {}
