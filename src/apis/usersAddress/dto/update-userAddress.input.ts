import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUsersAddressInput } from './create-userAddress.input';

@InputType()
export class UpdateUsersAddressInput extends PartialType(
  CreateUsersAddressInput,
) {}
