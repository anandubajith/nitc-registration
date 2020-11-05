import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/services/auth.service';
import { ApplicationEntity } from '../model/application.entity';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    private authService: AuthService,
    private userService: UserService,
  ) {}
}