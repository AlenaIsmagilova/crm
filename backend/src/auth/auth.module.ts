import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { HashService } from 'src/hash/hash.service';
import { HashModule } from 'src/hash/hash.module';
import { TemporaryUsersModule } from 'src/temporary-user/temporary-users.module';

@Module({
  imports: [
    PassportModule,
    HashModule,
    ConfigModule,
    UsersModule,
    TemporaryUsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, HashService],
  controllers: [AuthController],
})
export class AuthModule {}
