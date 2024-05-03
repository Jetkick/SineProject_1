import { InputType, PickType } from '@nestjs/graphql';
import { CreateSupportInput } from 'src/apis/supports/dto/create-support.input';

@InputType()
export class CreateUsersInquiryInput extends PickType(
  CreateSupportInput,
  ['category', 'subCategory', 'text', 'title'],
  InputType,
) {}
