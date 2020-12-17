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
import { User, UserRole } from './model/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserIsUserGuard } from '../auth/guards/UserIsUser.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError(err => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<Object> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
      catchError(_ => {
        throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.USER)
  userDetails(): string {
    return 'hi';
  }

  // admin can delete?
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.userService.deleteOne(Number(id));
  }

  // for user to update his data
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }
}