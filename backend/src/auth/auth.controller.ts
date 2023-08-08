import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { TemporaryUsersService } from 'src/temporary-user/temporary-users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LocalGuard } from './local.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private temporaryUsersService: TemporaryUsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('users/signin')
  login(@Req() req) {
    /* здесь генерируется для пользователя JWT-токен */
    return this.authService.auth(req.user);
  }

  @Post('users/signup')
  async signup(@Body() registrationDto: RegistrationDto) {
    const tempUser = await this.temporaryUsersService.findUserByUsername(
      registrationDto.username,
    );

    if (!tempUser) {
      console.log(
        'Пользователь не найден. Обратитесь к вашему HR для регистрации',
      );
      return;
    }

    const { password } = registrationDto;

    /* При регистрации создаём пользователя и генерируем для него токен */
    const registratedUser = await this.usersService.createAfterComplitedRegistr(
      tempUser,
      password,
    );

    return this.authService.auth(registratedUser);
  }
}
