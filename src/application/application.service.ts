import { Injectable } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { application } from 'express';
import { userInfo } from 'os';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserRole } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './model/application.entity';
import { Application, ApplicationDTO, ApplicationStatus } from './model/application.interface';
import { VerificationEntity } from './model/verification.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) { }

  findOneByUserId(userId: number): Observable<Application> {
    return from(
      // this.applicationRepository.findOne({ owner }, { relations: ['owner'] }),
      this.applicationRepository.findOne({ owner: { id: userId } }, { relations: ['owner', 'payment', 'verificationStatus'] })
    ).pipe(
      map((application: Application) => {
        return application;
      }),
    );
  }
  findOne(id: number): Observable<Application> {
    return from(
      // this.applicationRepository.findOne({ owner }, { relations: ['owner'] }),
      this.applicationRepository.findOne({ id }, { relations: ['owner', 'payment', 'verificationStatus'] })
    ).pipe(
      map((application: Application) => {
        return application;
      }),
    );
  }
  getStageByUserType(role: UserRole): ApplicationStatus {
    if (role === UserRole.ACADEMIC_ADMIN) {
      return ApplicationStatus.PENDING_ACADEMIC;
    } else if (role === UserRole.SAC) {
      return ApplicationStatus.PENDING_SAC;
    } else if (role === UserRole.FACULTY) {
      return ApplicationStatus.PENDING_FA;
    }
    throw Error('Invalid role');
  }
  getNextStage(stage: ApplicationStatus): ApplicationStatus {
    if (stage == ApplicationStatus.PENDING_SAC) {
      return ApplicationStatus.PENDING_FA;
    } else if (stage == ApplicationStatus.PENDING_FA) {
      return ApplicationStatus.PENDING_ACADEMIC;
    } else if ( stage == ApplicationStatus.PENDING_ACADEMIC) {
      return ApplicationStatus.VERIFIED;
    }
    throw Error('Invalid???');
  }
  verifyApplication(user: User, id: number, status: string): Observable<any> {
    return from(
      this.applicationRepository.findOne({ id: id })
    ).pipe(
      map((application: Application) => {
        if (application.status !== this.getStageByUserType(user.role)) {
          throw new Error('Trying to update Application of invalid stage');
        }
        return application;
      }),
      map((application: Application) => {
        if ( status === 'accepted')
          application.status = this.getNextStage(application.status);
        if ( application.verificationStatus == null) 
          application.verificationStatus = new VerificationEntity();
        if (user.role === UserRole.SAC) {
          application.verificationStatus.sacId = user.id;
        } else if (user.role === UserRole.FACULTY) {
          application.verificationStatus.facultyId = user.id;
        } else if (user.role === UserRole.ACADEMIC_ADMIN) {
          application.verificationStatus.academicId = user.id;
        }
        application.verificationStatus.remark = status;
        return this.applicationRepository.save(application);
      })
    );
  }

  updateByUserId(userId: number, application: ApplicationDTO): Observable<any> {
    return from(
      this.applicationRepository.findOne({ owner: { id: userId } }, { relations: ['owner','payment', 'verificationStatus'] })
    ).pipe(
      map((applicationFound: Application) => {
        delete application.id;
        return { ...applicationFound, ...application, status: ApplicationStatus.PENDING_SAC };
      }),
      map((applicationUpdated: Application) => {
        return this.applicationRepository.save(applicationUpdated)
      })
    )
  }
  findByStatus(status: ApplicationStatus): Observable<Application[]> {
    return from(this.applicationRepository
      .find({ where: [{ status }], select: ['id', 'submission_date', 'owner', "verificationStatus" ], relations: ['owner', 'verificationStatus'], order: { submission_date: 'ASC' } }));
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
