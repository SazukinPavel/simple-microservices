import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogEntity } from './models/log.schema';
import { Log } from '@common/log';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LogEntity.name) private readonly logModel: Model<LogEntity>,
  ) {}

  async addLog(log: Log) {
    await this.logModel.create({ ...log });
  }
}
