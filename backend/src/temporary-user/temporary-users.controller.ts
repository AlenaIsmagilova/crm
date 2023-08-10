import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/types/role.enum';
import { CreateTemporaryUserDto } from './dto/create-temporary-user.dto';
import { TemporaryUsersService } from './temporary-users.service';

@Controller('temp-users')
export class TemporaryUsersController {
  constructor(private readonly temporaryUserService: TemporaryUsersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Req() req,
    @Body() createTemporaryUserDto: CreateTemporaryUserDto,
  ): Promise<typeof createTemporaryUserDto | string> | string {
    if (req.user.role === Role.SUPERADMIN) {
      return this.temporaryUserService.create(createTemporaryUserDto);
    } else if (req.user.role === Role.HR) {
      return this.temporaryUserService.create({
        ...createTemporaryUserDto,
        role: Role.USER,
      });
    }
  }
}
