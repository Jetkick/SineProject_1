import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersInquiriesService } from './usersInquiry.service';
import { UsersInquiry } from './entities/userInquiry.entity';
import { IContext } from 'src/common/interfaces/context';
import { CreateUsersInquiryInput } from './dto/create-userInquiry.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersInquiriesResolver {
  constructor(
    private readonly usersInquiriesService: UsersInquiriesService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => UsersInquiry)
  createUsersInquiry(
    @Args('createUsersInquiryInput')
    createUsersInquiryInput: CreateUsersInquiryInput,
    @Context() context: IContext,
  ): Promise<UsersInquiry> {
    const user = context.req.user;
    return this.usersInquiriesService.createUsersInquiry({
      user,
      createUsersInquiryInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [UsersInquiry])
  fetchUsersInquiries(
    @Context() context: IContext, //
  ): Promise<UsersInquiry[]> {
    const user = context.req.user;
    return this.usersInquiriesService.fetchUsersInquiries({
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => UsersInquiry)
  fetchUsersInquiry(
    @Args('usersInquiryId') usersInquiryId: string,
    @Context() context: IContext,
  ): Promise<UsersInquiry> {
    const user = context.req.user;
    return this.usersInquiriesService.fetchUsersInquiry({
      usersInquiryId,
      user,
    });
  }
}
