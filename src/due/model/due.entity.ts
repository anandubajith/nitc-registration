import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DueType } from './due.interface';

@Entity()
export class DueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  updatedDate: string;

  @Column()
  rollNumber: string;

  @Column({
    type: 'enum',
    enum: DueType,
  })
  status: DueType;
}
