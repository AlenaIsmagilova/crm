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

  async create(
    createTemporaryUserDto: CreateTemporaryUserDto,
  ): Promise<TemporaryUser> {
    //генерирую уникальный юзернэйм, чтобы вернуть его на фронт для завершения регистрации
    const uniqueUsername = generateUsername();
    const createdUser = this.temporaryUserRepository.create({
      ...createTemporaryUserDto,
      username: uniqueUsername,
    });

    await this.temporaryUserRepository.save(createdUser);

    return createdUser;
  }

  async findUserByUsername(username: string): Promise<TemporaryUser> {
    const user = await this.temporaryUserRepository.findOneBy({ username });

    return user;
  }

  async deleteTempUser(username: string): Promise<any> {
    return await this.temporaryUserRepository.delete({ username });
  }
}
