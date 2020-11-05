
export interface Due {
  id?: number;
  amount?: number;
  rollNumber?: string;
  updatedDate?: string;
  type: DueType
}

export enum DueType {
  HOSTEL='hostel',
  LIBRARY = 'library'
}
