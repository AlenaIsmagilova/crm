import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { Role } from 'src/types/role.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private hashService: HashService,
  ) {}

  auth(user: User): { access_token: string; user: User } {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { privateKey: 'jwtKey' }),
      user,
    };
  }

  async validatePassword(username: string, pass: string): Promise<User> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('Пользователя не существует');
    }

    const decodedPswrd = await this.hashService.comparePassword(
      pass,
      user.password,
    );

    if (user && decodedPswrd) {
      //возвращаю юзера без пароля в req
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
}
