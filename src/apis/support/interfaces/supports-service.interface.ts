import { CreateSupportInput } from '../dto/create-support.input';
import { UpdateSupportInput } from '../dto/update-support.input';

export interface ISupportsServiceCreate {
  createSupportInput: CreateSupportInput;
}

export interface ISupportsServiceFindOneByTitle {
  title: string;
}

export interface ISupportsServiceUpdate {
  supportId: string;
  updateSupportInput: UpdateSupportInput;
}

export interface ISupportsServiceDelete {
  supportId: string;
}
