import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './model/application.entity';
import { PaymentEntity } from './model/payment.entity';
import { VerificationEntity } from './model/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, PaymentEntity, VerificationEntity])],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
