import { CreateNotifyInput } from '../dto/create-notify.input';
import { UpdateNotifyInput } from '../dto/update-notify.input';

export interface INotifiesServiceCreate {
  createNotifyInput: CreateNotifyInput;
}

export interface INotifiesServiceUpdate {
  notifyId: string;
  updateNotifyInput: UpdateNotifyInput;
}

export interface INotifiesServiceDelete {
  notifyId: string;
}

export interface INotifiesServiceFetch {
  notifyId: string;
}
