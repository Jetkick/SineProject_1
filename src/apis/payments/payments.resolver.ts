import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';
import { CreatePaymentInput } from './dto/create-payment.input';

@Resolver()
export class PaymentsResolver {
  constructor(
    private readonly paymentsService: PaymentsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payment)
  createPayment(
    @Args('impUid') impUid: string, //
    @Args({ name: 'point', type: () => Int, nullable: true }) point: number,
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @Context() context: IContext,
  ): Promise<Payment> {
    const user = context.req.user;
    return this.paymentsService.createForPayment({
      impUid,
      point,
      user,
      createPaymentInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payment)
  cancelPayment(
    @Args('impUid') impUid: string, //
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.paymentsService.cancel({ impUid, user, createPaymentInput });
  }
}
