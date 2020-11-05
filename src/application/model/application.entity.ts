import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';
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

  @Column()
  submission_date: string;

  @Column()
  verifiedBy: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(
    type => UserEntity,
    user => user.applications,
  )
  applicant: UserEntity;
}
