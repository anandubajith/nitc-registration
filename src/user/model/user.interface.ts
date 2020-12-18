import { Application } from "src/application/model/application.interface";

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
  application?: Application;
}

export enum UserRole {
  ADMIN = 'admin',
  HOSTEL_ADMIN = 'hostel_admin',
  LIBRARY_ADMIN = 'library_admin',
  ACADEMIC_ADMIN = 'academic_admin',
  SAC = 'sac_admin',
  FACULTY = 'fa',
  USER = 'user',
}
