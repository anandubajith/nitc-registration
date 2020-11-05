import { User } from '../../user/model/user.interface';

export interface Application {
  id?: number;
  status: ApplicationStatus;
  applicant: User;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  VERIFIED = 'verified',
}
