import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MESSAGE_SERVICE_MYSQL_HOST,
      port: +process.env.MESSAGE_SERVICE_MYSQL_PORT,
      username: process.env.MESSAGE_SERVICE_MYSQL_ROOT_USER,
      password: process.env.MESSAGE_SERVICE_MYSQL_ROOT_PASSWORD,
      database: process.env.MESSAGE_SERVICE_MYSQL_DATABASE,
      entities: [MessageEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
