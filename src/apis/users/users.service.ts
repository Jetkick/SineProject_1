import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SignUpsService } from '../signUp/signUps.service';
import * as bcrypt from 'bcrypt';
import {
  IUsersServiceGetAccessToken,
  IUsersServiceLogin,
  IUsersServiceRefreshToken,
  IUsersServiceSetRefreshToken,
} from './interfaces/users-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersService: SignUpsService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
    context,
  }: IUsersServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다');

    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IUsersServiceRefreshToken): string {
    return this.getAccessToken({ user });
  }

  // res, context를 받을 때 받는 방법을 달리 생각해 봐야한다.
  setRefreshToken({ user, res, context }: IUsersServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id }, //
      { secret: 'userRefreshPassword', expiresIn: '2w' },
    );

    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    if (res) {
      res.setHeader(
        'set-Cookie', //
        `refreshToken=${refreshToken}; path=/;`,
      );
    }
  }

  getAccessToken({ user }: IUsersServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'userPassword', expiresIn: '1h' },
    );
  }
}
