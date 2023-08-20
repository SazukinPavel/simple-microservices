import { Injectable } from '@nestjs/common';
import { Log } from './models/log.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) {}

  async addLog(log: Log) {
    await this.logModel.create({ ...log });
  }
}
