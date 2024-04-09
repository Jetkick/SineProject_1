import { Module } from '@nestjs/common';
import { NotifiesResolver } from './notifies.resolver';
import { NotifiesService } from './notifies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from './entities/notify.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notify, //
    ]),
  ],
  providers: [
    NotifiesResolver, //
    NotifiesService,
  ],
})
export class NotifiesModule {}
