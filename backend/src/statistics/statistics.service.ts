import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/types/role.enum';
import { IBirthDateUser } from 'src/types/types';
import { User } from 'src/users/entities/user.entity';
import { Between, In, IsNull, MoreThan, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  private get _today() {
    return new Date();
  }

  private get _currYear() {
    return this._today.getFullYear();
  }

  private get _currMonth() {
    return this._today.getMonth();
  }

  private get _currDay() {
    return this._today.getDate();
  }

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async _getCountsBetweenTwoDates(startDate, endDate): Promise<number> {
    return await this.userRepository.count({
      where: {
        employmentDate: Between(startDate, endDate),
        role: In([Role.HR, Role.USER]),
      },
    });
  }

  async countOfEmployedInCurrentMonth(): Promise<number> {
    return this._getCountsBetweenTwoDates(
      new Date(this._currYear, this._currMonth, 1),
      new Date(this._currYear, this._currMonth, this._currDay),
    );
  }

  async countOfEmployedInCurrentYear(): Promise<number> {
    return this._getCountsBetweenTwoDates(
      new Date(this._currYear, 0, 1),
      new Date(this._currYear, this._currMonth, this._currDay),
    );
  }

  async countOfFiredInCurrentYear(): Promise<number> {
    return this._getCountsBetweenTwoDates(
      new Date(this._currYear, 0, 1),
      new Date(this._currYear, this._currMonth, this._currDay, 23, 59),
    );
  }

  async countOfFiredInCurrentMonth(): Promise<number> {
    return this._getCountsBetweenTwoDates(
      new Date(this._currYear, this._currMonth, 1),
      new Date(this._currYear, this._currMonth, this._currDay, 23, 59),
    );

    // return await this.userRepository.count({
    //   where: {
    //     firementDate: Between(
    //       new Date(currYear, currMonth, 1),
    //       new Date(currYear, currMonth, currDay, 23, 59),
    //     ),
    //     role: In([Role.HR, Role.USER]),
    //   },
    // });
  }

  async birthDateInCurrentMonth(): Promise<IBirthDateUser[]> {
    return await this.userRepository.find({
      where: {
        birthDate: Between(
          new Date(this._currYear, this._currMonth, 1),
          new Date(this._currYear, this._currMonth, 31),
        ),
        role: In([Role.HR, Role.USER]),
        isFired: false,
      },
      select: { firstName: true, lastName: true, birthDate: true, id: true },
    });
  }

  async expectedSalaryPayments(): Promise<number[]> {
    const salaryInEveryMonth = new Array(12).fill(0);

    const arr = await this.userRepository.find({
      select: {
        salary: true,
        id: true,
        isFired: true,
        employmentDate: true,
        firementDate: true,
      },
      where: [
        {
          role: In([Role.HR, Role.USER]),
          firementDate: IsNull(),
        },
        {
          role: In([Role.HR, Role.USER]),
          firementDate: MoreThan(new Date(this._currYear, 0, 1)),
        },
      ],
    });
    arr.forEach((user) => {
      const yearOfEmploymentDate = new Date(user.employmentDate).getFullYear();
      const monthOfEmploymentDate = new Date(user.employmentDate).getMonth();
      const monthOfFirementDate = user.firementDate
        ? new Date(user.firementDate).getMonth()
        : null;

      salaryInEveryMonth.forEach((totalSalary, index, arr) => {
        if (yearOfEmploymentDate < this._currYear) {
          if (monthOfFirementDate === null || monthOfFirementDate >= index) {
            arr[index] = totalSalary + user.salary;
          }
          return;
        }
        if (yearOfEmploymentDate === this._currYear) {
          if (monthOfEmploymentDate <= index) {
            if (monthOfFirementDate === null || monthOfFirementDate >= index) {
              arr[index] = totalSalary + user.salary;
            }
          }
        }
      });
    });
    return salaryInEveryMonth;
  }
}
