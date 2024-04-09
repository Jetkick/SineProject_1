import { InputType, PartialType } from '@nestjs/graphql';
import { CreateShippingInstructionInput } from './create-shippyInstruction.input';

@InputType()
export class UpdateShippingInstructionInput extends PartialType(
  CreateShippingInstructionInput,
) {}
