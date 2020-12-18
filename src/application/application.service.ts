import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './model/application.entity';
import { Application, ApplicationDTO, ApplicationStatus } from './model/application.interface';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) { }

  findOne(userId: number): Observable<Application> {
    return from(
      // this.applicationRepository.findOne({ owner }, { relations: ['owner'] }),
      this.applicationRepository.findOne({ owner: { id: userId } }, { relations: ['owner','payment','verificationStatus'] })
    ).pipe(
      map((application: Application) => {
        return application;
      }),
    );
  }

  updateByUserId(userId: number, application: ApplicationDTO): Observable<any> {
     return from(
      this.applicationRepository.findOne({ owner: {id:userId}}, { relations: ['owner']})
    ).pipe(
      map((applicationFound:Application) => {
        delete application.id;
        return {...applicationFound, ...application, status: ApplicationStatus.PENDING};
      }),
      map((applicationUpdated:Application) => {
        return this.applicationRepository.save(applicationUpdated)
      })
    )
  }
  findByStatus(status: ApplicationStatus): Observable<Application[]> {
    return from(this.applicationRepository
      .find({ where: [{ status }], select: ['id', 'submission_date'], order: { submission_date: 'ASC' } }));
  }

  findAll(): Observable<Application[]> {
    return from(this.applicationRepository.find()).pipe(
      map((applications: Application[]) => {
        return applications;
      }),
    );
  }

  create(applicationData: object): Observable<Application> {
    const application = new ApplicationEntity();
    application.status = ApplicationStatus.PENDING;
    // todo: set stuff here
    return from(this.applicationRepository.save(application));
  }
}
