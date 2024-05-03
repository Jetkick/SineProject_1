import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSupportInput } from './create-support.input';

@InputType()
export class UpdateSupportInput extends PartialType(CreateSupportInput) {}
