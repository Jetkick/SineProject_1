import { Response } from 'express';
import { User } from 'src/apis/signUp/entities/signUp.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';

export interface IUsersServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IUsersServiceRefreshToken {
  user: IAuthUser['user'];
}

export interface IUsersServiceSetRefreshToken {
  user: User;
  context?: IContext;
  res?: Response;
}

export interface IUsersServiceGetAccessToken {
  user: User | IAuthUser['user'];
}
