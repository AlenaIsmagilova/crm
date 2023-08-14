import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/types/role.enum';

export class RegistrationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  fatherName: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  employmentDate: Date;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role;
}
