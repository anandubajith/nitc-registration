import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DueController } from './due.controller';
import { DueService } from './due.service';
import { DueEntity } from './model/due.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DueEntity]), UserModule],
  controllers: [DueController],
  providers: [DueService],
  exports: [],
})
export class DueModule {}
