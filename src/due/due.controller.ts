import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from 'src/user/model/user.interface';
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

  @hasRoles(UserRole.HOSTEL_ADMIN, UserRole.LIBRARY_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)    
  @Get('list')
  listDues(): Observable<Due[]> {
    return this.dueService.findAll();
  }

  @Post('create')
  @hasRoles(UserRole.HOSTEL_ADMIN, UserRole.LIBRARY_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)    
  create(@Body() due: Due): Observable<Due | Object> {
    // upload a CSV with rollNumber, amount
    // due type based on the current user
    return this.dueService.create(due).pipe(
      map((due: Due) => due),
      catchError(err => of({ error: err.message })),
    );
  }

}
