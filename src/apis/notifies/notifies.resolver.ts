import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotifiesService } from './notifies.service';
import { Notify } from './entities/notify.entity';
import { CreateNotifyInput } from './dto/create-notify.input';
import { UpdateNotifyInput } from './dto/update-notify.input';

@Resolver()
export class NotifiesResolver {
  constructor(
    private readonly notifiesService: NotifiesService, //
  ) {}

  @Mutation(() => Notify)
  createNotify(
    @Args('createNotifyInput') createNotifyInput: CreateNotifyInput,
  ): Promise<Notify> {
    return this.notifiesService.createNotify({ createNotifyInput });
  }

  @Mutation(() => Notify)
  updateNotify(
    @Args('notifyId') notifyId: string,
    @Args('updateNotifyInput') updateNotifyInput: UpdateNotifyInput,
  ): Promise<Notify> {
    return this.notifiesService.updateNotify({ notifyId, updateNotifyInput });
  }

  @Mutation(() => Boolean)
  deleteNotify(
    @Args('notifyId') notifyId: string, //
  ): Promise<boolean> {
    return this.notifiesService.deleteNotify({ notifyId });
  }

  @Query(() => [Notify])
  fetchNotifies(): Promise<Notify[]> {
    return this.notifiesService.fetchNotifies();
  }

  @Query(() => Notify)
  fetchNotify(
    @Args('notifyId') notifyId: string, //
  ): Promise<Notify> {
    return this.notifiesService.fetchNotify({ notifyId });
  }
}
