import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './model/application.entity';
import { Application, ApplicationStatus } from './model/application.interface';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  findOne(id: number): Observable<Application> {
    return from(
      this.applicationRepository.findOne({ id }, { relations: [] }),
    ).pipe(
      map((application: Application) => {
        return application;
      }),
    );
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
