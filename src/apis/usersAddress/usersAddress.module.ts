import { Module } from '@nestjs/common';
import { UsersAddressResolver } from './usersAddress.resolver';
import { UsersAddressService } from './usersAddress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/userAddress.entity';
import { SignUpsService } from '../signUp/signUps.service';
import { User } from '../signUp/entities/signUp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAddress, //
    ]),
  ],
  providers: [
    SignUpsService,
    UsersAddressResolver, //
    UsersAddressService,
  ],
})
export class UsersAddressModule {}
