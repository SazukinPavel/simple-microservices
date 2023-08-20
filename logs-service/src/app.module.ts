import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './models/log.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.LOGS_SERVICE_DATABASE_ROOT_USERNAME}:${process.env.LOGS_SERVICE_DATABASE_ROOT_PASSWORD}@${process.env.LOGS_SERVICE_MONGO_HOST}:${process.env.LOGS_SERVICE_MONGO_PORT}/${process.env.LOGS_SERVICE_DATABASE_NAME}?authSource=admin`,
    ),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
