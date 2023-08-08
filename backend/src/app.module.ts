import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { JwtService } from '@nestjs/jwt';
import { TemporaryUser } from './temporary-user/entities/temporary-user.entity';
import { TemporaryUsersModule } from './temporary-user/temporary-users.module';
import { HashModule } from './hash/hash.module';
import { HashService } from './hash/hash.service';

@Module({
  imports: [
    UsersModule,
    TemporaryUsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alena_1',
      password: 'alena_1',
      database: 'nest_project_1',
      entities: ['./users/entities/user.entity.ts', TemporaryUser],
      synchronize: true,
    }),
    AuthModule,
    HashModule,
    ConfigModule.forRoot({ load: [config] }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, HashService],
})
export class AppModule {}
