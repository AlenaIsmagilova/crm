import { Role } from 'src/types/role.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

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
  role: Role;

  @IsOptional()
  isFired?: boolean;

  @IsOptional()
  firementDate?: Date;
}
