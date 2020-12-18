import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { use } from 'passport';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Due } from 'src/due/model/due.interface';
import { User, UserRole } from 'src/user/model/user.interface';
import { ApplicationService } from './application.service';
import { Application, ApplicationStatus } from './model/application.interface';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  getApplication(@CurrentUser() user: User): Observable<Application> {
    console.log(user.application);
    return this.applicationService.findOne(user.id);
  }

  @Post()
  createApplication(): string {
    return 'upsert the application';
  }

  @Get('list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.SAC, UserRole.FACULTY, UserRole.ACADEMIC_ADMIN)
  listApplications(@CurrentUser() user: User): Observable<Application[]> {
    if (user.role === UserRole.SAC) {
      return this.applicationService.findByStatus(ApplicationStatus.PENDING_SAC);
    } else if (user.role === UserRole.FACULTY) {
      return this.applicationService.findByStatus(ApplicationStatus.PENDING_FA);
    } else if (user.role === UserRole.ACADEMIC_ADMIN) {
      return this.applicationService.findByStatus(ApplicationStatus.PENDING_ACADEMIC);
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('create')
  create(@Body() application: Application): Observable<Application | Object> {
    return this.applicationService.create(application).pipe(
      map((application: Application) => application),
      catchError(err => of({ error: err.message })),
    );
  }
}
