import { Module } from '@nestjs/common';
import { DueService } from './service/due.service';
import { DueController } from './controller/due.controller';

@Module({
  providers: [DueService],
  controllers: [DueController],
})
export class DueModule {}
