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
  ) {}

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

  create(dueData: Due): Observable<Due> {
    const due = new DueEntity();
    due.amount = dueData.amount;
    due.rollNumber = dueData.rollNumber;
    due.updatedDate = Date.now().toString();
    due.type = DueType.HOSTEL;
    return from(this.dueRepository.save(due));
  }
}
