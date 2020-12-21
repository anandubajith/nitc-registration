import {Verification} from './verification.interface';

export interface Application {
  id?: number;
  status: ApplicationStatus;
  verificationStatus: Verfication;
}

export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  PENDING = 'pending',
  PENDING_SAC = 'pending_sac',
  PENDING_FA = 'pending_fa',
  PENDING_ACADEMIC = 'pending_academic',
  VERIFIED = 'verified',
}

export interface ApplicationDTO {
  id: number;
  payment?: PaymentDTO;
}

export interface PaymentDTO {
  transactionId?: string;
  amount?: string;
  paymentDate?: string;
  bank?: string;
  modeOfPayment?: string;
}