import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersAddressService } from './usersAddress.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UserAddress } from './entities/userAddress.entity';
import { IContext } from 'src/common/interfaces/context';
import { CreateUsersAddressInput } from './dto/create-userAddress.input';
import { UpdateUsersAddressInput } from './dto/update-userAddress.input';

@Resolver()
export class UsersAddressResolver {
  constructor(
    private readonly usersAddressService: UsersAddressService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => UserAddress)
  createUsersAddress(
    @Args('createUsersAddressInput')
    createUsersAddressInput: CreateUsersAddressInput, //
    @Context() context: IContext,
  ): Promise<UserAddress> {
    const user = context.req.user;
    return this.usersAddressService.createUsersAddress({
      createUsersAddressInput,
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => UserAddress)
  updateUsersAddress(
    @Args('userAddressId') userAddressId: string, //
    @Args('updateUsersAddressInput')
    updateUsersAddressInput: UpdateUsersAddressInput,
    @Context() context: IContext,
  ): Promise<UserAddress> {
    const user = context.req.user;
    return this.usersAddressService.updateUsersAddress({
      userAddressId,
      updateUsersAddressInput,
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteUsersAddress(
    @Args('userAddressId') userAddressId: string, //
  ): Promise<boolean> {
    return this.usersAddressService.deleteUsersAddress({ userAddressId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [UserAddress])
  fetchsUsersAddress(
    @Context() context: IContext, //
  ): Promise<UserAddress[]> {
    const user = context.req.user;
    return this.usersAddressService.fetchsUsersAddress({
      user,
    });
  }
}
