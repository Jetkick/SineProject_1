import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  product: string;

  @Field(() => String)
  productCategory: string;

  @Field(() => String, { nullable: true })
  productSubCategory: string;

  @Field(() => String)
  productImage: string;

  @Field(() => String, { nullable: true })
  productTag: string;

  @Field(() => String)
  productWeight: string;

  @Field(() => Number)
  productPrice: number;

  @Field(() => String, { nullable: true })
  productDiscountPersent: string;

  @Field(() => [String])
  productDetailOptions: string[];
}
