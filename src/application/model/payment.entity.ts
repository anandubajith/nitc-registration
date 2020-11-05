import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';

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
}
