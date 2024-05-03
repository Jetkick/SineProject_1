import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  product: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  productCategory: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  productSubCategory: string;

  @Column({ type: 'varchar', length: 500 })
  @Field(() => String)
  productImage: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  productTag: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  productWeight: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  productPrice: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String, { nullable: true })
  productDiscountPersent: string;

  @Column('simple-array')
  @Field(() => [String])
  productDetailOptions: string[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
