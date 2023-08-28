import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus = 500;
    let responseBody = { message: '', statusCode: httpStatus, result: false };

    if ((exception as unknown as any).response) {
      const data = exception as unknown as any;
      httpStatus = data.status;
      responseBody = data.response;
    } else if (exception?.message) {
      exception = new HttpException(exception.message, HttpStatus.BAD_REQUEST);
      httpStatus = 400;
    } else {
      exception = new InternalServerErrorException();
      httpStatus = 500;
    }

    responseBody = responseBody.message
      ? responseBody
      : {
          ...responseBody,
          message: exception.message,
        };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
