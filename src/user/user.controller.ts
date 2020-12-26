import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole, UserUpdateDTO } from './model/user.interface';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserIsUserGuard } from '../auth/guards/UserIsUser.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('login')
  login(@Body() user: User): Observable<Object> {
    return this.userService.login(user).pipe(
      map((response: object) => {
        return response;
      }),
      catchError(_ => {
        throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.USER, UserRole.FACULTY)
  userDetails(@CurrentUser() user: User): Observable<User> {
    return from(this.userService.findOne(user.id));
  }

  @Post('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.USER, UserRole.FACULTY)
  updateUserDetails(@CurrentUser() user: User, @Body() details: UserUpdateDTO): Observable<User> {
    const updated = {
      email: details.email,
      contactNumber: details.contactNumber,
      egrantz: details.egrantz,
      faName: details.faName,
      category: details.category,
      profileUpdated: true,
    }
    return from(this.userService.updateOne(user.id, { ...user, ...updated }));
  }

  @Post('update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@CurrentUser() user: User, @Body() details: {oldPassword: string, newPassword: string}) {
    if ( !!details.oldPassword || !!details.newPassword ) {
      throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
    }
    this.userService.updatePassword(user.username, details.oldPassword, details.newPassword);

  }

  @Get('fa-names')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.USER)
  getFaNames(): Observable<String[]> {
    return from(this.userService.getFaNames());
  }

}
