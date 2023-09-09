import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import Request from 'src/types/Request';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.auth?.user;
  },
);
