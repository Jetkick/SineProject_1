import { IAuthUser } from 'src/common/interfaces/context';
import { CreateUsersInquiryInput } from '../dto/create-userInquiry.input';

export interface IUsersInquiriesServiceFetch {
  user: IAuthUser['user'];
}

export interface IUsersInquiryServiceFetch {
  usersInquiryId: string;
  user: IAuthUser['user'];
}

export interface IUsersInquiriesServiceCreate {
  user: IAuthUser['user'];
  createUsersInquiryInput: CreateUsersInquiryInput;
}
