import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../user/model/user.entity';
import { ApplicationEntity } from './application.entity';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;
  @Column()
  amount: string;
  @Column()
  paymentDate: string;
  @Column()
  bank: string;
  @Column()
  modeOfPayment: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  // todo: relate with applciation
  @ManyToOne(
    type => ApplicationEntity,
    application => application.payments,
  )
  application: ApplicationEntity;
}
