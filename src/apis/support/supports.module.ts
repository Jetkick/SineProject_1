import { Module } from '@nestjs/common';
import { SupportsResolver } from './supports.resolver';
import { SupportsService } from './supports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Support, //
    ]),
  ],
  providers: [
    SupportsResolver, //
    SupportsService,
  ],
})
export class SupportsModule {}
