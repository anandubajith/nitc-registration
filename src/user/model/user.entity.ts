import { ApplicationEntity } from 'src/application/model/application.entity';
import { Application } from 'src/application/model/application.interface';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinColumn, OneToOne } from 'typeorm';
import { UserRole } from './user.interface';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({nullable: true})
  contactNumber: string;

  @Column()
  name: string;

  @Column({nullable: true})
  semester: string;

  @Column({nullable: true})
  department: string;

  @Column({nullable: true})
  category: string;

  @Column({nullable: true, default: false})
  egrantz: boolean;

  @Column({nullable: true})
  faName: string;

  @Column({nullable: true, default:false})
  profileUpdated: boolean;

  @OneToOne(() => ApplicationEntity, {nullable: true, cascade:true})
  @JoinColumn()
  application: Application;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
