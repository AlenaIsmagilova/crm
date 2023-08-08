import { Role } from 'src/role/role.enum';

export class CreateUserDto {
  firstName: string;

  username?: string;

  password?: string;

  lastName: string;

  fatherName: string;

  position: string;

  salary: number;

  employmentDate: Date;

  role: Role;
}
