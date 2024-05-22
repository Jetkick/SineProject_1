import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => Date)
  deliveryDate: Date;

  @Field(() => String)
  deliveryType: string;

  @Field(() => String)
  deliveryAccessType: string;

  @Field(() => String)
  deliveryAccessNote: string;

  @Field(() => String)
  deliveryNotification: string;

  @Field(() => String)
  kind: string;

  @Field(() => String)
  paymentMethod: string;

  @Field(() => String)
  paymentType: string;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  paymentConditions: boolean;
}
