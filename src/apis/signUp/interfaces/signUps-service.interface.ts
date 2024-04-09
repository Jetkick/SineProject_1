import { IAuthUser } from 'src/common/interfaces/context';
import { CreateUserInput } from '../dto/create-signUp.input';

export interface ISignUpsServiceCreate {
  createUserInput: CreateUserInput;
}

export interface ISignUpsServiceFindOneByEmail {
  email: string;
}

export interface ISignUpsServiceFindOneByUserId {
  userId: IAuthUser['user'];
}
