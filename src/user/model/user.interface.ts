export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  contactNumber?: string;
  name?: string;
  semester?: string;
  department?: string;
  category?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  HOSTEL_ADMIN = 'hostel_admin',
  LIBRARY_ADMIN = 'library_admin',
  USER = 'user',
}
