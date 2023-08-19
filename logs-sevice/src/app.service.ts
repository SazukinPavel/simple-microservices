import { Injectable } from '@nestjs/common';
import Log from './types/Log';

@Injectable()
export class AppService {

  addLog(log: Log) {
    console.log(log);
  }
}
