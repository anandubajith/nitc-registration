import { Module } from '@nestjs/common';
import { DueService } from './service/due.service';
import { DueController } from './controller/due.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DueEntity } from './model/due.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DueEntity]), UserModule, AuthModule],
  providers: [DueService],
  controllers: [DueController],
})
export class DueModule {}
