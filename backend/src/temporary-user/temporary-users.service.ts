import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateUsername } from 'unique-username-generator';
import { CreateTemporaryUserDto } from './dto/create-temporary-user.dto';
import { TemporaryUser } from './entities/temporary-user.entity';

@Injectable()
export class TemporaryUsersService {
  constructor(
    @InjectRepository(TemporaryUser)
    private temporaryUserRepository: Repository<TemporaryUser>,
  ) {}

  async create(createTemporaryUserDto: CreateTemporaryUserDto) {
    //генерирую уникальный юзернэйм, чтобы вернуть его на фронт для завершения регистрации
    const uniqueUsername = generateUsername();
    const createdUser = this.temporaryUserRepository.create({
      ...createTemporaryUserDto,
      username: uniqueUsername,
    });

    await this.temporaryUserRepository.save(createdUser);

    return createdUser.username;
  }

  async findUserByUsername(username: string) {
    const user = this.temporaryUserRepository.findOneBy({ username });

    return user;
  }
}
