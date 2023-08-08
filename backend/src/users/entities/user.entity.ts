import { Role } from 'src/role/role.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string | null;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fatherName?: string;

  @Column()
  position?: string;

  @Column()
  salary?: number;

  @Column({ type: 'timestamptz' })
  employmentDate?: Date;

  @Column({ default: Role.USER })
  role?: Role;
}
