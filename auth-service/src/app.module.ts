import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from './services/jwt.service';
import { CryptoService } from './services/crypto.service';

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
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, CryptoService],
})
export class AppModule {}
