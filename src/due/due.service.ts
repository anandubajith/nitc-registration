import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { DueEntity } from './model/due.entity';
import { Due, DueType } from './model/due.interface';

@Injectable()
export class DueService {

  constructor(
    @InjectRepository(DueEntity)
    private readonly dueRepository: Repository<DueEntity>,
  ) { }


  findByUsername(rollNumber: string): Observable<Due[]> {
    return from(
      this.dueRepository.find({ rollNumber }),
    ).pipe(
      map((dues: Due[]) => {
        return dues;
      }),
    );
  }

  findByType(type: DueType): Observable<Due[]> {
    return from(this.dueRepository.find({ type: type }));
  }

  findOne(rollNumber: string): Observable<Due> {
    return from(
      this.dueRepository.findOne({ rollNumber }, { relations: [] }),
    ).pipe(
      map((due: Due) => {
        return due;
      }),
    );
  }

  findAll(): Observable<Due[]> {
    return from(this.dueRepository.find()).pipe(
      map((dues: Due[]) => {
        return dues;
      }),
    );
  }

  create(dueData: Due): Observable<any> {
    return from(
      this.dueRepository.findOne({ type: dueData.type, rollNumber: dueData.rollNumber }, { relations: [] }),
    ).pipe(
      map((due: Due) => {
        if (due) {
          due.amount = dueData.amount;
        } else {
          due = new DueEntity();
          due.amount = dueData.amount;
          due.type = dueData.type;
          due.rollNumber = dueData.rollNumber;
        }
        return due;
      }),
      map((due: Due) => {
        due.updatedDate = Date.now().toString();
        return this.dueRepository.save(due);
      })
    );

  }
}
