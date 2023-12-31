import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { TemporaryUser } from 'src/temporary-user/entities/temporary-user.entity';
import { Role } from 'src/types/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { superAdmin } from '../constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  public onModuleInit(): void {
    this._createSuperAdmin();
  }

  private async _createSuperAdmin(): Promise<User> {
    const superAdminUser = await this.userRepository.findOneBy({
      role: Role.SUPERADMIN,
    });

    if (superAdminUser) {
      return;
    }

    const hashedPasswordForSuperAdmin = await this.hashService.hashPassword(
      'superadmin',
    );
    const createdUser = this.userRepository.create({
      ...superAdmin,
      password: hashedPasswordForSuperAdmin,
    });
    await this.userRepository.save(createdUser);
    return createdUser;
  }

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
      isFired: false,
      firementDate: null,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        isFired: false,
      },
    });

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
    // const user = await this.userRepository.findOneBy({ username });

    // return user;

    return this.userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where(`user.username = :username`, { username })
      .addSelect('user.password')
      .getOne();
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.findOneBy({ id });

    await this.userRepository.update(updateUserDto.id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  async updateOneAfterFired(id: number): Promise<User> {
    await this.userRepository.findOneBy({ id });

    await this.userRepository.update(id, {
      isFired: true,
      firementDate: new Date(),
    });

    return await this.userRepository.findOneBy({ id });
  }
}
