import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from '@nestjs/config';
import LogsMiddleware from './middlewares/http-logger.middleware';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MessageModule,
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
