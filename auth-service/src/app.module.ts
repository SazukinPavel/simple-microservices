import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from './services/jwt.service';
import { CryptoService } from './services/crypto.service';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AUTH_SERVICE_PG_HOST,
      port: +process.env.AUTH_SERVICE_PG_PORT,
      username: process.env.AUTH_SERVICE_PG_ROOT_USER,
      password: process.env.AUTH_SERVICE_PG_ROOT_PASSWORD,
      database: process.env.AUTH_SERVICE_PG_DATABASE,
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, CryptoService],
})
export class AppModule {}
