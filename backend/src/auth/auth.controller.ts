import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TemporaryUsersService } from 'src/temporary-user/temporary-users.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LocalGuard } from './local.guard';

@Controller('users')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private temporaryUsersService: TemporaryUsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/signin')
  login(@Req() req): { access_token: string } {
    // здесь генерируется для пользователя JWT-токен
    return this.authService.auth(req.user);
  }

  @Post('/signup')
  async signup(@Body() registrationDto: RegistrationDto): Promise<{
    access_token: string;
  }> {
    const tempUser = await this.temporaryUsersService.findUserByUsername(
      registrationDto.username,
    );

    if (!tempUser) {
      throw new NotFoundException(
        'Пользователь не найден. Обратитесь к вашему HR для регистрации',
      );

      return;
    }

    const { password } = registrationDto;

    // при регистрации создаю пользователя и генерирую для него токен
    const registratedUser = await this.usersService.createAfterComplitedRegistr(
      tempUser,
      password,
    );

    return this.authService.auth(registratedUser);
  }
}
