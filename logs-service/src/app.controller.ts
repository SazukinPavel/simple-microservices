import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Log } from '@common/log';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('addLog')
  async addLog(data: Record<string, Log>) {
    this.appService.addLog(data.data);
  }
}
