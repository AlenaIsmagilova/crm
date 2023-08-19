import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../types/role.enum';

@Entity()
export class TemporaryUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fatherName: string;

  @Column()
  position: string;

  @Column()
  salary: number;

  @Column({ type: Date })
  employmentDate: Date;

  @Column({ type: Date })
  birthDate: Date;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
