import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

@Entity()
export class StudentInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rollNumber: string;

  @Column()
  semester: string;

  @Column()
  category: string;
}
