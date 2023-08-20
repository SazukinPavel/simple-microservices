import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Log } from './models/log.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @EventPattern('addLog')
  async addLog(data: Record<string, Log>) {
    this.appService.addLog(data.data)
  }
}