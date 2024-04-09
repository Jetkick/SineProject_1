import { Field, ObjectType } from '@nestjs/graphql';
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
export class Notify {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @Field(() => String)
  notifyArticleImage: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @Field(() => String, { nullable: true })
  text: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Field(() => String, { nullable: true })
  textImage: string;

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
