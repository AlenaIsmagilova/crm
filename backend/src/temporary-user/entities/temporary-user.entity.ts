import { Role } from 'src/role/role.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TemporaryUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fatherName?: string;

  @Column()
  position: string;

  @Column()
  salary: number;

  @Column({ type: 'timestamptz' })
  employmentDate: Date;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
