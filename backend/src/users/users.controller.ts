import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async findMe(@Req() req) {
    const { password, ...result } = req.user;
    return result;
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch()
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    if (req.user.role === Role.USER) {
      return 'У вас нет прав на обновление данных';
    } else {
      return await this.usersService.updateOne(updateUserDto.id, updateUserDto);
    }
  }

  @UseGuards(JwtGuard)
  @Delete()
  async remove(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    if (req.user.role === Role.USER) {
      return 'У вас нет прав на удаление данных';
    }
    return await this.usersService.remove(updateUserDto.id, updateUserDto);
  }
}
