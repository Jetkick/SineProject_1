import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSupportInput {
  @Field(() => String)
  category: string;

  @Field(() => String, { nullable: true })
  secondCategory?: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;
}
