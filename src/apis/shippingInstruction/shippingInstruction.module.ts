import { Module } from '@nestjs/common';
import { ShippingInstructionResolver } from './shippingInstruction.resolver';
import { ShippingInstructionService } from './shippingInstruction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shippyInstruction } from './entities/shippyInstruction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      shippyInstruction, //
    ]),
  ],
  providers: [
    ShippingInstructionResolver, //
    ShippingInstructionService,
  ],
})
export class ShippingInstructionModule {}
