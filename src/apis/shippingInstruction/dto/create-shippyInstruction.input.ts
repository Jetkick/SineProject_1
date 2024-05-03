import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShippingInstructionInput {
  @Field(() => String)
  shippingArea: string;

  @Field(() => String)
  deliveryType: string;
}
