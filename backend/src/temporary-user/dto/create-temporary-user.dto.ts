import { Role } from 'src/role/role.enum';

export class CreateTemporaryUserDto {
  firstName: string;

  lastName: string;

  fatherName: string;

  position: string;

  salary: number;

  employmentDate: Date;

  role: Role;
}
