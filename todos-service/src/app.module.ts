import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TODOS_SERVICE_MYSQL_HOST,
      port: +process.env.TODOS_SERVICE_MYSQL_PORT,
      username: process.env.TODOS_SERVICE_MYSQL_ROOT_USER,
      password: process.env.TODOS_SERVICE_MYSQL_ROOT_PASSWORD,
      database: process.env.TODOS_SERVICE_MYSQL_DATABASE,
      entities: [Todo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
