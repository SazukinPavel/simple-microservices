import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, body } = request;
      const { statusCode, statusMessage } = response;

      const stack = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
      const context = 'http';
      if (statusCode >= 500) {
        return this.logger.error(body, stack, context);
      }

      if (statusCode >= 400) {
        return this.logger.warn(body, stack, context);
      }

      return this.logger.log(body, stack, context);
    });

    next();
  }
}

export default LogsMiddleware;
