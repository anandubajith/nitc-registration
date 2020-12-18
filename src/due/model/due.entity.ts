import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { DueType } from './due.interface';

@Entity()
@Unique(["rollNumber", "type"])
export class DueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  updatedDate: string;

  @Column()
  rollNumber: string;

  @Column({
    type: 'enum',
    enum: DueType,
  })
  type: DueType;
}
