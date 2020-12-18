import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './model/application.entity';
import { PaymentEntity } from './model/payment.entity';
import { VerificationEntity } from './model/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, PaymentEntity, VerificationEntity]), UserModule],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
