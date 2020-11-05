export interface Application {
  id?: number;
  status?: ApplicationStatus;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  VERIFIED = 'verified',
}
