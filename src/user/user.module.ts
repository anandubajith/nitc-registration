import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StudentInfoEntity } from './model/student-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, StudentInfoEntity]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
