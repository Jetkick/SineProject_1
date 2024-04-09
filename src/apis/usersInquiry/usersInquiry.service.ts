import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SignUpsService } from '../signUp/signUps.service';
import { UsersInquiry } from './entities/userInquiry.entity';
import {
  IUsersInquiriesServiceCreate,
  IUsersInquiriesServiceFetch,
} from './interfaces/usersInquiry-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersInquiriesService {
  constructor(
    @InjectRepository(UsersInquiry)
    private readonly usersInpuiriesRepository: Repository<UsersInquiry>, //

    private readonly signUpsService: SignUpsService,
  ) {}

  async createUsersInquiry({
    user: userId,
    createUsersInquiryInput,
  }: IUsersInquiriesServiceCreate): Promise<UsersInquiry> {
    const user = await this.signUpsService.findOneByUserId({ userId });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    return this.usersInpuiriesRepository.save({
      userId: user,
      ...createUsersInquiryInput,
    });
  }

  async fetchUsersInquiry({
    user: userId,
  }: IUsersInquiriesServiceFetch): Promise<UsersInquiry[]> {
    const user = await this.signUpsService.findOneByUserId({ userId });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    return this.usersInpuiriesRepository.find();
  }
}
