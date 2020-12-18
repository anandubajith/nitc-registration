import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { Repository, Like } from 'typeorm';
import { User, UserRole } from './model/user.interface';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Application } from 'src/application/model/application.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) { }

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.contactNumber = user.contactNumber;
        newUser.semester = user.semester;
        newUser.name = user.name;
        newUser.category = user.category;
        newUser.department = user.department;
        newUser.role = UserRole.USER;

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError(err => throwError(err)),
        );
      }),
    );
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne({ id }, { relations: [] })).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
      map((usersPageable: Pagination<User>) => {
        usersPageable.items.forEach(function (v) {
          delete v.password;
        });
        return usersPageable;
      }),
    );
  }

  paginateFilterByUsername(
    options: IPaginationOptions,
    user: User,
  ): Observable<Pagination<User>> {
    return from(
      this.userRepository.findAndCount({
        skip: options.page * options.limit || 0,
        take: options.limit || 10,
        order: { id: 'ASC' },
        select: ['id', 'username', 'email', 'role'],
        where: [{ username: Like(`%${user.username}%`) }],
      }),
    ).pipe(
      map(([users, totalUsers]) => {
        const usersPageable: Pagination<User> = {
          items: users,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${options.page + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalUsers / options.limit,
              )}`,
          },
          meta: {
            currentPage: options.page,
            itemCount: users.length,
            itemsPerPage: options.limit,
            totalItems: totalUsers,
            totalPages: Math.ceil(totalUsers / options.limit),
          },
        };
        return usersPageable;
      }),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  updateRoleOfUser(id: number, user: User): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<any> {
    return this.validateUser(user.username, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => ({
              user, accessToken: jwt
            })));
        } else {
          return throwError('Wrong Credentials');
        }
      }),
    );
  }

  validateUser(username: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne(
        { username },
        {
          select: ['id', 'password', 'username', 'email', 'role', 'department', 'semester', 'category', 'contactNumber'],
        },
      ),
    ).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  findByMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ email }));
  }
}
