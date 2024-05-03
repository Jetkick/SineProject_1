import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  certifieNumber: string;

  @Field(() => Boolean)
  termsConditions: boolean;

  @Field(() => Boolean)
  personalInformation: boolean;
}
