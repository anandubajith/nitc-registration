import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class VerificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true})
  sacId: number;

  @Column({ nullable: true})
  facultyId: number;
    
  @Column({ nullable: true})
  academicId: number;

  @Column({ nullable: true})
  remark: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
