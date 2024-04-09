import { IAuthUser } from 'src/common/interfaces/context';
import { CreateUsersInquiryInput } from '../dto/create-userInquiry.input';

export interface IUsersInquiriesServiceCreate {
  user: IAuthUser['user'];
  createUsersInquiryInput: CreateUsersInquiryInput;
}

export interface IUsersInquiriesServiceFetch {
  user: IAuthUser['user'];
}
