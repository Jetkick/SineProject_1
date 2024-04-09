import { Module } from '@nestjs/common';
import { UsersInquiriesResolver } from './usersInquiry.resolver';
import { UsersInquiriesService } from './usersInquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInquiry } from './entities/userInquiry.entity';
import { SignUpsService } from '../signUp/signUps.service';
import { User } from '../signUp/entities/signUp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersInquiry, //
      User,
    ]),
  ],
  providers: [
    UsersInquiriesResolver, //
    UsersInquiriesService,
    SignUpsService,
  ],
})
export class UsersInquiriesModule {}
