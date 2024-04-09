import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ShippingInstructionService } from './shippingInstruction.service';
import { shippyInstruction } from './entities/shippyInstruction.entity';
import { CreateShippingInstructionInput } from './dto/create-shippyInstruction.input';
import { UpdateShippingInstructionInput } from './dto/update-shippyInstruction.input';

@Resolver()
export class ShippingInstructionResolver {
  constructor(
    private readonly shippingInstructionService: ShippingInstructionService,
  ) {}

  @Mutation(() => shippyInstruction)
  createShippingInstruction(
    @Args('createShippingInstructionInput')
    createShippingInstructionInput: CreateShippingInstructionInput,
  ): Promise<shippyInstruction> {
    return this.shippingInstructionService.createShippingInstruction({
      createShippingInstructionInput,
    });
  }

  @Mutation(() => shippyInstruction)
  updateShippingInstruction(
    @Args('shippyInstructionId') shippyInstructionId: string,
    @Args('updateShippingInstructionInput')
    updateShippingInstructionInput: UpdateShippingInstructionInput,
  ): Promise<shippyInstruction> {
    return this.shippingInstructionService.updateShippingInstruction({
      shippyInstructionId, //
      updateShippingInstructionInput,
    });
  }

  @Query(() => shippyInstruction)
  fetchShippingInstruction(
    @Args('shippyInstructionId') shippyInstructionId: string, //
  ): Promise<shippyInstruction> {
    return this.shippingInstructionService.fetchShippingInstruction({
      shippyInstructionId,
    });
  }
}
