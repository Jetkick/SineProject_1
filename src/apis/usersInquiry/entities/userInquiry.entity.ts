import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/signUp/entities/signUp.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UsersInquiry {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  category: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  secondCategory?: string;

  @Column({ type: 'varchar', length: 200 })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @Field(() => String)
  text: string;

  @ManyToOne(() => User)
  @Field(() => User)
  userId: User;

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
