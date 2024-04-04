import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SignUpService } from '../signUp/signUp.service';
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
    private readonly usersService: SignUpService, //

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

  // 이거 방식이 조금 이상함??
  async setRefreshToken({
    user,
    res,
    context,
  }: IUsersServiceSetRefreshToken): Promise<void> {
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
