import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, OneToMany } from 'typeorm';
import { Application, ApplicationStatus } from './application.interface';
import { UserEntity } from '../../user/model/user.entity';
import { PaymentEntity } from './payment.entity';
import { Payment } from './payment.interface';

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

  @OneToMany(
    type => PaymentEntity,
    paymentEntity => paymentEntity.application,
  )
  payments: Payment[];
}
