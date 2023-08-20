import {
  Controller,
  ForbiddenException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/types/role.enum';
import { StatisticsService } from './statistics.service';

@Controller('users/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(JwtGuard)
  @Post('employment-month')
  findAllEmployedInCurrMonth(@Req() req): Promise<number | string> {
    if (req.user.role === Role.HR || req.user.role === Role.SUPERADMIN) {
      return this.statisticsService.countOfEmployedInCurrentMonth();
    }
    throw new ForbiddenException('У вас нет прав на просмотр данных');
  }

  @UseGuards(JwtGuard)
  @Post('employment-year')
  findAllEmployedInCurrYear(@Req() req): Promise<number | string> {
    if (req.user.role === Role.HR || req.user.role === Role.SUPERADMIN) {
      return this.statisticsService.countOfEmployedInCurrentYear();
    }
    throw new ForbiddenException('У вас нет прав на просмотр данных');
  }

  @UseGuards(JwtGuard)
  @Post('firement-month')
  findAllFiredInCurrMonth(@Req() req): Promise<number | string> {
    if (req.user.role === Role.HR || req.user.role === Role.SUPERADMIN) {
      return this.statisticsService.countOfFiredInCurrentMonth();
    }
    throw new ForbiddenException('У вас нет прав на просмотр данных');
  }

  @UseGuards(JwtGuard)
  @Post('firement-year')
  findAllFiredInCurrYear(@Req() req): Promise<number | string> {
    if (req.user.role === Role.HR || req.user.role === Role.SUPERADMIN) {
      return this.statisticsService.countOfFiredInCurrentYear();
    }
    throw new ForbiddenException('У вас нет прав на просмотр данных');
  }

  @UseGuards(JwtGuard)
  @Post('birthday-people')
  findAllBirthdayPeople(@Req() req) {
    if (req.user.role === Role.HR || req.user.role === Role.SUPERADMIN) {
      return this.statisticsService.birthDateInCurrentMonth();
    }
    throw new ForbiddenException('У вас нет прав на просмотр данных');
  }

  @UseGuards(JwtGuard)
  @Post('expected-salary-payments')
  findAllSalaryPayments(@Req() req) {
    if (req.user.role === Role.HR || req.user.role === Role.SUPERADMIN) {
      return this.statisticsService.expectedSalaryPayments();
    }
    throw new ForbiddenException('У вас нет прав на просмотр данных');
  }
}
