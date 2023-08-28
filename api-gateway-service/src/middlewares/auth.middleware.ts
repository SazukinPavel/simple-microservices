import { Inject, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import Request from 'src/types/Request';

export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      this.authService.me(req).subscribe(({ data }) => {
        req.auth = data;

        next();
      });
    } catch {
      next();
    }
  }
}
