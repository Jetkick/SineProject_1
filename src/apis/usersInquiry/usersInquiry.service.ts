import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SignUpsService } from '../signUp/signUps.service';
import { UsersInquiry } from './entities/userInquiry.entity';
import {
  IUsersInquiriesServiceCreate,
  IUsersInquiriesServiceFetch,
  IUsersInquiryServiceFetch,
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

  async fetchUsersInquiries({
    user: userId,
  }: IUsersInquiriesServiceFetch): Promise<UsersInquiry[]> {
    const user = await this.signUpsService.findOneByUserId({ userId });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    const result = await this.usersInpuiriesRepository.find({
      where: { userId: user.id },
    });

    return result;
  }

  async fetchUsersInquiry({
    usersInquiryId,
    user: userId,
  }: IUsersInquiryServiceFetch): Promise<UsersInquiry> {
    const user = await this.signUpsService.findOneByUserId({ userId });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    return await this.usersInpuiriesRepository.findOne({
      where: { id: usersInquiryId },
    });
  }

  async createUsersInquiry({
    user: userId,
    createUsersInquiryInput,
  }: IUsersInquiriesServiceCreate): Promise<UsersInquiry> {
    const user = await this.signUpsService.findOneByUserId({ userId });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    return this.usersInpuiriesRepository.save({
      userId: user.id,
      ...createUsersInquiryInput,
    });
  }
}
