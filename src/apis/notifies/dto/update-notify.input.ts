import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNotifyInput } from './create-notify.input';

@InputType()
export class UpdateNotifyInput extends PartialType(CreateNotifyInput) {}
