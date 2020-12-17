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
    
    @Column()
    sacId: number;

    @Column()
    facultyId: number;

    @Column()
    academicId: number;

    @Column()
    remark: string;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;
  }
