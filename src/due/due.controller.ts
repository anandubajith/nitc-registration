import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { User } from 'src/user/model/user.interface';
import { DueService } from './due.service';
import { Due } from './model/due.interface';

@Controller('due')

export class DueController {
  constructor(private dueService: DueService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserDue( @CurrentUser() user: User): Observable<Due[]> {
    return this.dueService.findByUsername(user.username);
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
