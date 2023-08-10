import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/types/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async findMe(@Req() req): Promise<User> {
    const { password, ...result } = req.user;
    return result;
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch()
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | string> {
    if (req.user.role === (Role.HR || Role.SUPERADMIN)) {
      return await this.usersService.updateOne(updateUserDto.id, updateUserDto);
    }
    throw new ForbiddenException('У вас нет прав на обновление данных');
  }

  @UseGuards(JwtGuard)
  @Delete()
  async remove(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    if (req.user.role === (Role.HR || Role.SUPERADMIN)) {
      return await this.usersService.remove(updateUserDto.id, updateUserDto);
    }
    throw new ForbiddenException('У вас нет прав на удаление данных');
  }
}