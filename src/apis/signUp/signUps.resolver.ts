import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/signUp.entity';
import { SignUpsService } from './signUps.service';
import { CreateUserInput } from './dto/create-signUp.input';
import { UpdateUserInput } from './dto/update-signUp.input';

@Resolver()
export class SignUpsResolver {
  constructor(private readonly signUpsService: SignUpsService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.signUpsService.createUser({ createUserInput });
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.signUpsService.updateUser({ userId, updateUserInput });
  }

  @Mutation(() => User)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.signUpsService.deleteUser({ userId });
  }

  @Query(() => String)
  fetchUser(@Args('userPhoneNumber') userPhoneNumber: string): Promise<string> {
    return this.signUpsService.fetchUser({ userPhoneNumber });
  }
}
