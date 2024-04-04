import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/signUp.entity';
import { SignUpService } from './signUp.service';
import { CreateUserInput } from './dto/create-signUp.input';

@Resolver()
export class SignUpResolver {
  constructor(private readonly signUpService: SignUpService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.signUpService.createUser({ createUserInput });
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
