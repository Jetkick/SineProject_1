import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from './entities/userAddress.entity';
import { SignUpsService } from '../signUp/signUps.service';
import {
  IUsersAddressServiceCreate,
  IUsersAddressServiceDelete,
  IUsersAddressServiceFetchsUsersAddress,
  IUsersAddressServiceUpdate,
} from './interfaces/usersAddress-service.interface';

@Injectable()
export class UsersAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly usersAddressRepository: Repository<UserAddress>, //

    private readonly signUpsService: SignUpsService,
  ) {}

  async fetchsUsersAddress({
    user,
  }: IUsersAddressServiceFetchsUsersAddress): Promise<UserAddress[]> {
    const userId = await this.signUpsService.findOneByUserId({
      userId: user,
    });

    if (!userId)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    const result = await this.usersAddressRepository.find({
      where: { userId: userId.id },
    });

    return result;
  }

  async createUsersAddress({
    createUsersAddressInput,
    user,
  }: IUsersAddressServiceCreate): Promise<UserAddress> {
    const userId = await this.signUpsService.findOneByUserId({
      userId: user,
    });

    if (!userId)
      throw new UnprocessableEntityException('로그인을 다시 해주세요');

    const userAddressValidate = await this.usersAddressRepository.findOne({
      where: { userId: userId.id, address: createUsersAddressInput.address },
    });

    if (userAddressValidate)
      throw new UnprocessableEntityException('이미 등록되어 있는 주소입니다!');

    const result = this.usersAddressRepository.create({
      ...createUsersAddressInput,
      userId: userId.id,
    });

    return this.usersAddressRepository.save(result);
  }

  async updateUsersAddress({
    userAddressId,
    updateUsersAddressInput,
    user,
  }: IUsersAddressServiceUpdate): Promise<UserAddress> {
    const userId = await this.signUpsService.findOneByUserId({
      userId: user,
    });

    if (!userId)
      throw new UnprocessableEntityException('로그인을 다시 해주세요');

    const userAddress = await this.usersAddressRepository.findOne({
      where: { id: userAddressId },
    });

    const result = this.usersAddressRepository.merge(userAddress, {
      ...updateUsersAddressInput,
    });

    return result;
  }

  async deleteUsersAddress({
    userAddressId,
  }: IUsersAddressServiceDelete): Promise<boolean> {
    const result = await this.usersAddressRepository.softDelete({
      id: userAddressId,
    });
    return result.affected ? true : false;
  }
}
