import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApplicationService } from '../service/application.service';
import { UserService } from '../../user/service/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard';
import { UserIsApplicantGuard } from '../guards/user-is-applicant.guard';
import { Observable } from 'rxjs';
import { Application } from '../model/application.interface';

@Controller('application')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard, UserIsApplicantGuard)
  @Get(':id')
  hello(@Param('id') id: number): Observable<Application> {
    return this.applicationService.findOne(id);
  }
}
