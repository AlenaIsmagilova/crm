import { Role } from 'src/types/role.enum';

export const superAdmin = {
  firstName: 'superadmin',
  username: 'superadmin',
  lastName: 'superadmin',
  fatherName: 'superadmin',
  position: 'superadmin',
  salary: 0,
  employmentDate: new Date(),
  role: Role.SUPERADMIN,
};
