import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: Function) {
    const { originalUrl, body, query } = req;

    Logger.log('Request...');
    Logger.log({ originalUrl, body, query });

    next();
  }
}
