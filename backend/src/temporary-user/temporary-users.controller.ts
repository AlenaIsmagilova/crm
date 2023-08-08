import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { CreateTemporaryUserDto } from './dto/create-temporary-user.dto';
import { TemporaryUsersService } from './temporary-users.service';

@Controller('temp-users')
@UseGuards(RolesGuard)
export class TemporaryUsersController {
  constructor(private readonly temporaryUserService: TemporaryUsersService) {}

  @UseGuards(JwtGuard)
  @Post()
  // @Roles(Role.HR, Role.SUPERADMIN)
  create(
    @Req() req,
    @Body() createTemporaryUserDto: CreateTemporaryUserDto,
  ): Promise<typeof createTemporaryUserDto | string> | string {
    if (req.user.role === Role.SUPERADMIN) {
      if (!createTemporaryUserDto.role) {
        return 'Укажите роль сотрудника, которого вы хотите создать';
      } else {
        return this.temporaryUserService.create(createTemporaryUserDto);
      }
    } else if (req.user.role === Role.HR) {
      return this.temporaryUserService.create({
        ...createTemporaryUserDto,
        role: Role.USER,
      });
    }
  }
}
