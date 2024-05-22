import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/signUp.entity';
import { Repository } from 'typeorm';
import {
  ISignUpsServiceCreate,
  ISignUpsServiceDelete,
  ISignUpsServiceFetchUser,
  ISignUpsServiceFindOneByEmail,
  ISignUpsServiceFindOneByUserId,
  ISignUpsServiceUpdate,
} from './interfaces/signUps-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  async findOneByEmail({
    email,
  }: ISignUpsServiceFindOneByEmail): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async findOneByUserId({
    userId,
  }: ISignUpsServiceFindOneByUserId): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: userId['id'] || userId },
    });
  }

  async fetchUser({
    userPhoneNumber,
  }: ISignUpsServiceFetchUser): Promise<string> {
    const result = await this.usersRepository.findOne({
      where: { phoneNumber: userPhoneNumber },
    });

    if (!result)
      throw new UnprocessableEntityException('가입되지 않은 전화번호입니다!');

    return result.email;
  }

  async createUser({ createUserInput }: ISignUpsServiceCreate): Promise<User> {
    const {
      email,
      password,
      name,
      phoneNumber,
      certifieNumber,
      termsConditions,
      personalInformation,
    } = createUserInput;

    const user = await this.findOneByEmail({ email });

    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    if (termsConditions === false && personalInformation === false)
      throw new ConflictException('약관 동의를 하지 않았습니다.');

    const hashedPassword = await bcrypt.hash(password, 8);

    return this.usersRepository.save({
      name,
      password: hashedPassword,
      email,
      phoneNumber,
      certifieNumber,
      termsConditions,
      personalInformation,
    });
  }

  async updateUser({
    userId,
    updateUserInput,
  }: ISignUpsServiceUpdate): Promise<User> {
    const { email, password, name, phoneNumber, certifieNumber } =
      updateUserInput;

    const user = await this.findOneByUserId({ userId });

    if (!user)
      throw new UnprocessableEntityException('유저를 찾을 수 없습니다!');

    const hashedPassword = await bcrypt.hash(password, 8);

    const userUpdate = this.usersRepository.merge(user, {
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      certifieNumber,
    });

    return this.usersRepository.save(userUpdate);
  }

  async deleteUser({ userId }: ISignUpsServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }
}
