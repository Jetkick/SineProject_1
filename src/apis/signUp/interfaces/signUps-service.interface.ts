import { IAuthUser } from 'src/common/interfaces/context';
import { CreateUserInput } from '../dto/create-signUp.input';
import { UpdateUserInput } from '../dto/update-signUp.input';

export interface ISignUpsServiceFindOneByEmail {
  email: string;
}

export interface ISignUpsServiceFindOneByUserId {
  userId: string | IAuthUser['user'];
}

export interface ISignUpsServiceFetchUser {
  userPhoneNumber: string;
}

export interface ISignUpsServiceCreate {
  createUserInput: CreateUserInput;
}

export interface ISignUpsServiceUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}

export interface ISignUpsServiceDelete {
  userId: string;
}
