import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/signUp.entity';
import { Repository } from 'typeorm';
import {
  ISignUpServiceCreate,
  ISignUpServiceFindOneByEmail,
} from './interfaces/signUp-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  // 확장성 있게 데이터를 찾아오는 방법. 이메일에 국한된 것이 아닌 다른 것들도 찾을 수 있는 방법은?
  findOneByEmail({ email }: ISignUpServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async createUser({ createUserInput }: ISignUpServiceCreate): Promise<User> {
    const {
      email,
      password,
      name,
      phoneNumber,
      termsConditions,
      personalInformation,
    } = createUserInput;

    const user = await this.findOneByEmail({ email });

    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    if (termsConditions === true && personalInformation === true)
      throw new ConflictException('약관 동의를 하지 않았습니다.');

    const hashedPassword = await bcrypt.hash(password, 8);

    return this.usersRepository.save({
      name,
      password: hashedPassword,
      email,
      phoneNumber,
    });
  }
}
