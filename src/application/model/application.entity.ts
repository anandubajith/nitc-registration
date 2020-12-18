import { UserEntity } from 'src/user/model/user.entity';
import { User } from 'src/user/model/user.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApplicationStatus } from './application.interface';
import { PaymentEntity } from './payment.entity';
import { Payment } from './payment.interface';
import { VerificationEntity } from './verification.entity';
import { Verification } from './verification.interface';

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

  @Column({ nullable: true })
  submission_date: string;

  @Column({ nullable: true })
  verifiedBy: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  owner: User;

  @OneToOne(() => PaymentEntity)
  @JoinColumn()
  payment: Payment;

  @OneToOne(() => VerificationEntity)
  @JoinColumn()
  verificationStatus: Verification;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
