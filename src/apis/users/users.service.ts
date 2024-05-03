import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SignUpsService } from '../signUp/signUps.service';
import * as bcrypt from 'bcrypt';
import {
  IUsersServiceGetAccessToken,
  IUsersServiceLogin,
  IUsersServiceLoginOAuth,
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

    this.setRefreshToken({ user, res: context.res });

    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }: IUsersServiceLoginOAuth) {
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    if (!user)
      user = await this.usersService.createUser({ createUserInput: req.user });

    this.setRefreshToken({ user, res });

    res.redirect('http://127.0.0.1:5501/frontend/social-login-test.html');
  }

  restoreAccessToken({ user }: IUsersServiceRefreshToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, res }: IUsersServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id }, //
      { secret: 'userRefreshPassword', expiresIn: '2w' },
    );
    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IUsersServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'userPassword', expiresIn: '1h' },
    );
  }
}
