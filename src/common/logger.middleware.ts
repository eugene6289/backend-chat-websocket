import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    const { method, originalUrl, body } = req;

    console.log(`[${now}] [${method}] ${originalUrl}`);
    console.log(`→ Body:`, body);

    next();
  }
}