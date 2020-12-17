import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Due } from 'src/due/model/due.interface';
import { ApplicationService } from './application.service';
import { Application } from './model/application.interface';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  @Get()
  getApplication(): Observable<Application> {
    return this.applicationService.findOne(1);
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
