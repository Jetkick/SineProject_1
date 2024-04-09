import { InputType, PickType } from '@nestjs/graphql';
import { CreateSupportInput } from 'src/apis/support/dto/create-support.input';

@InputType()
export class CreateUsersInquiryInput extends PickType(
  CreateSupportInput,
  ['category', 'secondCategory', 'text', 'title'],
  InputType,
) {}
