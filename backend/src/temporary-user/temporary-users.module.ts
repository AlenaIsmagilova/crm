import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporaryUser } from './entities/temporary-user.entity';
import { TemporaryUsersController } from './temporary-users.controller';
import { TemporaryUsersService } from './temporary-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([TemporaryUser])],
  controllers: [TemporaryUsersController],
  providers: [TemporaryUsersService],
  exports: [TemporaryUsersService],
})
export class TemporaryUsersModule {}
