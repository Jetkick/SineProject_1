import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notify } from './entities/notify.entity';
import { Repository } from 'typeorm';
import {
  INotifiesServiceCreate,
  INotifiesServiceDelete,
  INotifiesServiceFetch,
  INotifiesServiceUpdate,
} from './interfaces/notifies-service.interface';

@Injectable()
export class NotifiesService {
  constructor(
    @InjectRepository(Notify)
    private readonly notifiesRepository: Repository<Notify>,
  ) {}

  fetchNotifies(): Promise<Notify[]> {
    return this.notifiesRepository.find({});
  }

  async fetchNotify({ notifyId }: INotifiesServiceFetch): Promise<Notify> {
    return this.notifiesRepository.findOne({
      where: { id: notifyId },
    });
  }

  createNotify({ createNotifyInput }: INotifiesServiceCreate): Promise<Notify> {
    return this.notifiesRepository.save({
      ...createNotifyInput,
    });
  }

  async updateNotify({
    notifyId,
    updateNotifyInput,
  }: INotifiesServiceUpdate): Promise<Notify> {
    const notify = await this.notifiesRepository.findOne({
      where: { id: notifyId },
    });

    if (!notify)
      throw new UnprocessableEntityException('존재하지 않는 ID 입니다.');

    return this.notifiesRepository.save({
      ...notify,
      ...updateNotifyInput,
    });
  }

  async deleteNotify({ notifyId }: INotifiesServiceDelete): Promise<boolean> {
    const result = await this.notifiesRepository.softDelete({
      id: notifyId,
    });
    return result.affected ? true : false;
  }
}
