
import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/user/service/user.service";
import { Observable } from "rxjs";
import { User } from "src/user/model/user.interface";
import { switchMap, map } from "rxjs/operators";
import { ApplicationService } from '../service/application.service';
import { Application } from '../model/application.interface';

@Injectable()
export class  UserIsApplicantGuard implements CanActivate {

  constructor(private userService: UserService, private applicationService: ApplicationService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const applicationId = Number(params.id);
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      switchMap((user: User) => this.applicationService.findOne(applicationId).pipe(
        map((applicationEntity: Application) => {
          let hasPermission = false;

          if(user.id === applicationEntity.applicant.id) {
            hasPermission = true;
          }

          return user && hasPermission;
        })
      ))
    )
  }
}
