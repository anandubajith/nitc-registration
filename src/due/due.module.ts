import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DueController } from './due.controller';
import { DueService } from './due.service';
import { DueEntity } from './model/due.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DueEntity])],
  controllers: [DueController],
  providers: [DueService],
  exports: [],
})
export class DueModule {}
