import { Role } from 'src/role/role.enum';

export class RegistrationDto {
  username: string;

  firstName: string;

  lastName: string;

  fatherName: string;

  position: string;

  salary: number;

  employmentDate: Date;

  password: string;

  role: Role;
}
