import { Module } from '@nestjs/common';
import { ShippingInstructionResolver } from './shippingInstruction.resolver';
import { ShippingInstructionService } from './shippingInstruction.service';

@Module({
  imports: [],
  providers: [
    ShippingInstructionResolver, //
    ShippingInstructionService,
  ],
})
export class ShippingInstructionModule {}
