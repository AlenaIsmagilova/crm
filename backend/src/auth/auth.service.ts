import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { Role } from 'src/role/role.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private hashService: HashService,
  ) {}

  auth(user: User): { access_token: string } {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { privateKey: 'jwtKey' }),
    };
  }

  async validatePassword(username: string, pass: string): Promise<User> {
    const user = await this.userService.findByUsername(username);

    if (user.role === Role.SUPERADMIN) {
      return user;
    } else {
      const decodedPswrd = await this.hashService.comparePassword(
        pass,
        user.password,
      );

      if (user && decodedPswrd) {
        //возвращаем юзера без пароля на фронт
        const { password, ...result } = user;

        return result;
      }
      return null;
    }
  }
}
