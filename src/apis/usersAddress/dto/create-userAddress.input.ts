import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUsersAddressInput {
  @Field(() => String)
  recipient: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  postalCode: string;

  @Field(() => String)
  address: string;

  @Field(() => String, { nullable: true })
  detailAddress: string;
}
