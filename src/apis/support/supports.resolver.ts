import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Support } from './entities/support.entity';
import { SupportsService } from './supports.service';
import { CreateSupportInput } from './dto/create-support.input';
import { UpdateSupportInput } from './dto/update-support.input';

@Resolver()
export class SupportsResolver {
  constructor(
    private readonly supportsService: SupportsService, //
  ) {}

  @Mutation(() => Support)
  createSupport(
    @Args('createSupportInput') createSupportInput: CreateSupportInput,
  ): Promise<Support> {
    return this.supportsService.createSupport({ createSupportInput });
  }

  @Mutation(() => Support)
  updateSupport(
    @Args('supportId') supportId: string,
    @Args('updateSupportInput') updateSupportInput: UpdateSupportInput,
  ): Promise<Support> {
    return this.supportsService.updateSupport({
      supportId,
      updateSupportInput,
    });
  }

  @Mutation(() => Boolean)
  deleteSupport(
    @Args('supportId') supportId: string, //
  ): Promise<boolean> {
    return this.supportsService.deleteSupport({ supportId });
  }

  @Query(() => [Support])
  fetchSupports(): Promise<Support[]> {
    return this.supportsService.findSupportAll();
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
