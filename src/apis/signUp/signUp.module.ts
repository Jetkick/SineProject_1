import { Module } from '@nestjs/common';
import { SignUpResolver } from './signUp.resolver';
import { SignUpService } from './signUp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/signUp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    SignUpResolver, //
    SignUpService,
  ],
  exports: [
    SignUpService, //
  ],
})
export class SignUpModule {}
