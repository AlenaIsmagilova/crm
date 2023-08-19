export interface ITemporaryUser {
  firstName: string;
  lastName: string;
  fatherName: string;
  birthDate: string;
  employmentDate: string;
  position: string;
  salary: number;
  role: string;
  id?: string;
}

export interface IRegistrationForm {
  password: string;
}

export interface ISignInForm {
  username: string;
  password: string;
}

export enum RoleEnum {
  SUPERADMIN = "SUPERADMIN",
  USER = "USER",
  HR = "HR",
}

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthDate: string;
  employmentDate: string;
  position: string;
  salary: number;
  role: string; // Role enum
}
