import { Role } from 'src/types/role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string | null;

  @Column({ select: false })
  password?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fatherName: string;

  @Column()
  birthDate: Date;

  @Column()
  position: string;

  @Column()
  salary: number;

  @Column({ type: Date, default: () => 'Now()' })
  employmentDate: Date;

  @Column({ default: false })
  isFired: boolean;

  @Column({ type: Date, nullable: true })
  firementDate: Date;

  @Column({ default: Role.USER })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
