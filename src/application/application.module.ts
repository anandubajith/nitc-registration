import { Module } from '@nestjs/common';
import { ApplicationController } from './controller/application.controller';
import { ApplicationService } from './service/application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ApplicationEntity } from './model/application.entity';
import { UserModule } from '../user/user.module';
import { PaymentEntity } from './model/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity, PaymentEntity]),
    UserModule,
    AuthModule,
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
