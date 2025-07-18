import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';
import CustomHttpException from '../configuration/errors/custom-http-exeption';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const apiKey = req.header('x-api-key');

    if (!apiKey || !this.authService.validateApiKey(apiKey)) {
      throw CustomHttpException.unauthorized();
    }

    next();
  }
}
