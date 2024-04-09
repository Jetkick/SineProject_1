import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { shippyInstruction } from './entities/shippyInstruction.entity';
import {
  IShippingInstructionServiceCreate,
  IShippingInstructionServiceFindOne,
  IShippingInstructionServiceUpdate,
} from './interfaces/shippingInstruction-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingInstructionService {
  constructor(
    @InjectRepository(shippyInstruction)
    private readonly shippingInstructionRepository: Repository<shippyInstruction>,
  ) {}

  async fetchShippingInstruction({
    shippyInstructionId,
  }: IShippingInstructionServiceFindOne): Promise<shippyInstruction> {
    return this.shippingInstructionRepository.findOne({
      where: { id: shippyInstructionId },
    });
  }

  createShippingInstruction({
    createShippingInstructionInput,
  }: IShippingInstructionServiceCreate): Promise<shippyInstruction> {
    return this.shippingInstructionRepository.save({
      ...createShippingInstructionInput,
    });
  }

  async updateShippingInstruction({
    shippyInstructionId,
    updateShippingInstructionInput,
  }: IShippingInstructionServiceUpdate): Promise<shippyInstruction> {
    const data = await this.shippingInstructionRepository.findOne({
      where: { id: shippyInstructionId },
    });

    if (!data)
      throw new UnprocessableEntityException(
        '배송 지역 ID가 존재하지 않습니다.',
      );

    return this.shippingInstructionRepository.save({
      ...data,
      ...updateShippingInstructionInput,
    });
  }
}
