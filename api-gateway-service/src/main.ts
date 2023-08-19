import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogsService } from './logs/logs.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LogsService));

  const configService = app.get(ConfigService);
  const port = configService.get('API_GATEWAY_PORT');

  await app.listen(port)
}
bootstrap();
