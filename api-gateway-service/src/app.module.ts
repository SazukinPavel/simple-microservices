import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from '@nestjs/config';
import LogsMiddleware from './middlewares/http-logger.middleware';

@Module({
  imports: [
    TodosModule,
    LogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
