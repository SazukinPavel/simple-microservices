import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import config from 'src/config';
import { Log } from '@common/log';

@Injectable()
export class LogsService extends ConsoleLogger {
  constructor(
    @Inject(config.logsServiceName) private readonly logsClient: ClientProxy,
  ) {
    super();
  }

  addLog(log: Log) {
    this.logsClient.emit('addLog', { data: { ...log, ts: Date.now() } });
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message);
    this.addLog({
      context,
      data: message,
      stack,
      level: 'error',
    });
  }

  warn(message: any, stack?: string, context?: string) {
    super.warn(message);
    this.addLog({
      context,
      data: message,
      stack,
      level: 'warn',
    });
  }

  debug(message: any, stack?: string, context?: string) {
    super.debug(message);
    this.addLog({
      context,
      data: message,
      stack,
      level: 'debug',
    });
  }

  verbose(message: any, stack?: string, context?: string) {
    super.verbose(message);
    this.addLog({
      context,
      data: message,
      stack,
      level: 'verbose',
    });
  }

  log(message: any, stack?: string, context?: string) {
    super.log(message);
    this.addLog({
      context,
      data: message,
      stack,
      level: 'log',
    });
  }
}
