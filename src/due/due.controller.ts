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

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)    
  @hasRoles(UserRole.HOSTEL_ADMIN, UserRole.LIBRARY_ADMIN)
  create(@CurrentUser() user: User, @Body() due: Due): Observable<Due | Object> {
    const dueData = { ...due } ;
    if ( user.role === UserRole.LIBRARY_ADMIN ) {
      dueData.type = DueType.LIBRARY;
    } else if ( user.role == UserRole.HOSTEL_ADMIN) {
      dueData.type = DueType.HOSTEL;
    } else {
      console.log(user.role)
    }
    return this.dueService.create(dueData).pipe(
      map((due: Due) => due),
      catchError(err => of({ error: err.message })),
    );
  }

}
