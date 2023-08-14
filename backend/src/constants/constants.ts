import { Role } from 'src/types/role.enum';

export const superAdmin = {
  firstName: 'superadmin',
  username: 'superadmin',
  lastName: 'superadmin',
  fatherName: 'superadmin',
  position: 'superadmin',
  salary: 0,
  birthDate: new Date(),
  employmentDate: new Date(),
  role: Role.SUPERADMIN,
  firementDate: new Date(),
  isFired: false,
};
