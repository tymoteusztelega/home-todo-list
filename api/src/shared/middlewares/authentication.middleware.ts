import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from '../../modules/authentication/authentication.service';
import { unauthorizedUserException } from '../helpers/errors';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {}
  use(req: Request, res: Response, next: Function) {
    const user = this.authenticationService.getCurrentUser();
    if (!user) unauthorizedUserException();
    next();
  }
}
