import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
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

export enum PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CENCEL',
}

registerEnumType(PAYMENT_STATUS_ENUM, {
  name: 'PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'date' })
  @Field(() => Date)
  deliveryDate: Date;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  deliveryType: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  deliveryAccessType: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  deliveryAccessNote?: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  deliveryNotification: string;

  @Column({})
  @Field(() => String)
  impUid: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  kind: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  paymentMethod: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  paymentType: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  paymentConditions: boolean;

  @Column({ type: 'enum', enum: PAYMENT_STATUS_ENUM })
  @Field(() => PAYMENT_STATUS_ENUM)
  status: PAYMENT_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  userId: User;

  // @ManyToOne(() => Delivery, (delivery) => delivery.payment_id)
  // @Field(() => Delivery)
  // deliveryId: Delivery;

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
