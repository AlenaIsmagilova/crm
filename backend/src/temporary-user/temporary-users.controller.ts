import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/types/role.enum';
import { IUsername } from 'src/types/username';
import { CreateTemporaryUserDto } from './dto/create-temporary-user.dto';
import { TemporaryUser } from './entities/temporary-user.entity';
import { TemporaryUsersService } from './temporary-users.service';

@Controller('temp-users')
export class TemporaryUsersController {
  constructor(private readonly temporaryUserService: TemporaryUsersService) {}

  @Post('/get-temp-user-by-username')
  async findOne(@Body() username: IUsername): Promise<TemporaryUser> {
    const tempUser = await this.temporaryUserService.findUserByUsername(
      username.username,
    );
    if (!tempUser) {
      throw new NotFoundException('Данный пользователь не найден');
    }
    return tempUser;
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Req() req,
    @Body() createTemporaryUserDto: CreateTemporaryUserDto,
  ): Promise<TemporaryUser> {
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
