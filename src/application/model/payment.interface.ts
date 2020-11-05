export interface Payment {
  id?: number;
  transactionId?: string;
  amount?: string;
  paymentDate?: string;
  bank?: string;
  modeOfPayment?: string;
  updatedAt?: Date;
}
