import { Role } from 'src/types/role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string | null;

  @Column()
  password?: string;

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

  @Column({ type: Date, default: () => 'Now()' })
  employmentDate: Date;

  @Column({ default: Role.USER })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}