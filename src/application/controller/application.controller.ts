import { Controller } from '@nestjs/common';
import { ApplicationService } from '../service/application.service';
import { UserService } from '../../user/service/user.service';

@Controller('application')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
  ) {}
}
