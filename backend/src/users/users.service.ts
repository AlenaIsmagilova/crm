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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...createUserDto,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async createAfterComplitedRegistr(
    tempUser: TemporaryUser,
    password: string,
  ): Promise<User> {
    const hashedPass = await this.hashService.hashPassword(password);

    const createdUser = this.userRepository.create({
      ...tempUser,
      password: hashedPass,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new UnauthorizedException();
    }

    return users;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    const updatedUser = await this.userRepository.update(
      user.id,
      updateUserDto,
    );

    return user;
  }

  async remove(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    await this.userRepository.delete(updateUserDto.id);
    return 'Пользователь удалён';
  }
}
