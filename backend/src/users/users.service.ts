import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { TemporaryUser } from 'src/temporary-user/entities/temporary-user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create({
      ...createUserDto,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async createAfterComplitedRegistr(tempUser: TemporaryUser, password: string) {
    const hashedPass = await this.hashService.hashPassword(password);

    const createdUser = this.userRepository.create({
      ...tempUser,
      password: hashedPass,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new UnauthorizedException();
    }

    return users;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    return this.userRepository.update(user.id, updateUserDto);
  }

  async remove(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.delete(updateUserDto.id);
    return 'Пользователь удалён';
  }
}
