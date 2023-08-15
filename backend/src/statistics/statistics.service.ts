import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/types/role.enum';
import { User } from 'src/users/entities/user.entity';
import { Between, In, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async countOfEmployedInCurrentMonth(): Promise<number> {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth();
    const currDay = today.getDate();

    return await this.userRepository.count({
      where: {
        employmentDate: Between(
          new Date(currYear, currMonth, 1),
          new Date(currYear, currMonth, currDay),
        ),
        role: Role.HR || Role.USER,
      },
    });
  }

  async countOfEmployedInCurrentYear(): Promise<number> {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth();
    const currDay = today.getDate();

    return await this.userRepository.count({
      where: {
        employmentDate: Between(
          new Date(currYear, 0, 1),
          new Date(currYear, currMonth, currDay),
        ),
        role: Role.HR || Role.USER,
      },
    });
  }

  async countOfFiredInCurrentYear(): Promise<number> {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth();
    const currDay = today.getDate();

    return await this.userRepository.count({
      where: {
        firementDate: Between(
          new Date(currYear, 0, 1),
          new Date(currYear, currMonth, currDay),
        ),
        role: Role.HR || Role.USER,
      },
    });
  }

  async countOfFiredInCurrentMonth(): Promise<number> {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth();
    const currDay = today.getDate();

    return await this.userRepository.count({
      where: {
        firementDate: Between(
          new Date(currYear, currMonth, 1),
          new Date(currYear, currMonth, currDay),
        ),
        role: Role.HR || Role.USER,
      },
    });
  }

  async birthDateInCurrentMonth(): Promise<any> {
    const today = new Date();
    const currYear = today.getFullYear();
    const currMonth = today.getMonth();

    return await this.userRepository.find({
      where: {
        birthDate: Between(
          new Date(currYear, currMonth, 1),
          new Date(currYear, currMonth, 31),
        ),
        role: In([Role.HR, Role.USER]),
      },
      select: { firstName: true, lastName: true, birthDate: true, id: true },
    });
  }
}
