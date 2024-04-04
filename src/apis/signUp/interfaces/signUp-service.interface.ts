import { CreateUserInput } from '../dto/create-signUp.input';

export interface ISignUpServiceCreate {
  createUserInput: CreateUserInput;
}

export interface ISignUpServiceFindOneByEmail {
  email: string;
}
