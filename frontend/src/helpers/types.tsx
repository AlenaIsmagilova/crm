export interface ITemporaryUser {
  firstName: string;
  lastName: string;
  fatherName: string;
  employmentDate: string;
  position: string;
  salary: number;
  role: string;
}

export interface IRegistrationForm {
  password: string;
}

export interface ISignInForm {
  username: string;
  password: string;
}

export interface ISignInProps {
  isLoggedIn: boolean;
}
