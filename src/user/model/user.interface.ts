export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profileImage?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  LIBRARY = 'library',
  HOSTEL = 'hostel',
  FACULTY = 'faculty',
  ACADEMIC = 'academic',
  USER = 'user',
}
