import { IsNotEmpty, IsOptional } from 'class-validator';

import { Role } from 'src/types/role.enum';

export class CreateTemporaryUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  fatherName: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  employmentDate: Date;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  role: Role;
}
