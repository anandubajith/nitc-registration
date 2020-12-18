import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Due } from 'src/due/model/due.interface';
import { User } from 'src/user/model/user.interface';
import { ApplicationService } from './application.service';
import { Application } from './model/application.interface';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  
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
  listApplications(): Observable<Application[]> {
    return this.applicationService.findAll();
  }

  @Post('create')
  create(@Body() application: Application): Observable<Application | Object> {
    return this.applicationService.create(application).pipe(
      map((application: Application) => application),
      catchError(err => of({ error: err.message })),
    );
  }
}
