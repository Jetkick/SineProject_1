import { CreateShippingInstructionInput } from '../dto/create-shippyInstruction.input';
import { UpdateShippingInstructionInput } from '../dto/update-shippyInstruction.input';

export interface IShippingInstructionServiceCreate {
  createShippingInstructionInput: CreateShippingInstructionInput;
}

export interface IShippingInstructionServiceUpdate {
  shippyInstructionId: string;
  updateShippingInstructionInput: UpdateShippingInstructionInput;
}

export interface IShippingInstructionServiceFindOne {
  shippyInstructionId: string;
}
