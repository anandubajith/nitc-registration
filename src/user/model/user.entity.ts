import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from './user.interface';
import { Application } from '../../application/model/application.interface';
import { ApplicationEntity } from '../../application/model/application.entity';
import { StudentInfoEntity } from './student-info.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(
    () => ApplicationEntity,
    applicationEntity => applicationEntity.applicant,
  )
  applications: Application[];

  @OneToOne(() => StudentInfoEntity)
  @JoinColumn()
  studentInfoEntity: StudentInfoEntity;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
