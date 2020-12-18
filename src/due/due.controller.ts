import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from 'src/user/model/user.interface';
import { DueService } from './due.service';
import { Due, DueType } from './model/due.interface';

@Controller('due')
export class DueController {
  constructor(private dueService: DueService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getDue(@CurrentUser() user: User): Observable<Due[]> {
    if ( user.role === UserRole.USER ) {
      return this.dueService.findByUsername(user.username);
    } else if ( user.role == UserRole.HOSTEL_ADMIN ) {
      return this.dueService.findByType(DueType.HOSTEL);
    } else if ( user.role === UserRole.LIBRARY_ADMIN ) {
      return this.dueService.findByType(DueType.LIBRARY);
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
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
