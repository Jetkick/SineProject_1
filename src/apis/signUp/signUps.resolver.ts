import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/signUp.entity';
import { SignUpsService } from './signUps.service';
import { CreateUserInput } from './dto/create-signUp.input';

@Resolver()
export class SignUpsResolver {
  constructor(private readonly signUpsService: SignUpsService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.signUpsService.createUser({ createUserInput });
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
