import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotifyInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  notifyArticleImage: string;

  @Field(() => String)
  titleCover: string;

  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => String, { nullable: true })
  textImage: string;
}
