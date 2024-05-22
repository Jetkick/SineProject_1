import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 150 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @PrimaryColumn()
  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  phoneNumber: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ type: 'varchar', length: 50 })
  certifieNumber: string;

  @Column({ type: 'boolean', default: false })
  termsConditions: boolean;

  @Column({ type: 'boolean', default: false })
  personalInformation: boolean;

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
