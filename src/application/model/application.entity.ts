import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany, ManyToOne,
} from 'typeorm';
import { ApplicationStatus } from './application.interface';
import { UserEntity } from '../../user/model/user.entity';

@Entity()
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @ManyToOne(type => UserEntity, user => user.applications)
  applicant: UserEntity;
}
