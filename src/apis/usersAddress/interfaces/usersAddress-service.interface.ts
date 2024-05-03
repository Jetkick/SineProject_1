import { IAuthUser } from 'src/common/interfaces/context';
import { CreateUsersAddressInput } from '../dto/create-userAddress.input';
import { UpdateUsersAddressInput } from '../dto/update-userAddress.input';

export interface IUsersAddressServiceFetchsUsersAddress {
  user: IAuthUser['user'];
}

export interface IUsersAddressServiceCreate {
  createUsersAddressInput: CreateUsersAddressInput;
  user: IAuthUser['user'];
}

export interface IUsersAddressServiceUpdate {
  userAddressId: string;
  updateUsersAddressInput: UpdateUsersAddressInput;
  user: IAuthUser['user'];
}

export interface IUsersAddressServiceDelete {
  userAddressId: string;
}
