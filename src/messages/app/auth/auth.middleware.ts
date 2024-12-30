import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';

/*// TODO refactor to global namespace
export interface SessionRequest extends Request {
  authHeader: string;
}*/

declare global {
  namespace Express {
    interface Request {
      authHeader: string;
    }
  }
}

export {};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || '';
    console.log('auth middleware', authHeader);
    req.authHeader = authHeader;
    next();
  }
}
