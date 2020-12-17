import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DueService } from './due.service';
import { Due } from './model/due.interface';

@Controller('due')
export class DueController {
  constructor(private dueService: DueService) {}

  @Get()
  getUserDue(): Observable<Due> {
    return this.dueService.findOne('B180288CS');
  }

  @Get('list')
  listDues(): Observable<Due[]> {
    return this.dueService.findAll();
  }

  @Post('create')
  create(@Body() due: Due): Observable<Due | Object> {
    return this.dueService.create(due).pipe(
      map((due: Due) => due),
      catchError(err => of({ error: err.message })),
    );
  }

  @Post('update')
  updateDue(): string {
    return 'update a due';
  }
}
