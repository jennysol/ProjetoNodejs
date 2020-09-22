import { Request, Response, NextFunction  } from 'express';
import { verify} from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/erros/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
//Validaçãoo do token
const authHeader = request.headers.authorization;

if (!authHeader) {
  throw new AppError('JWT token is missing', 401);
}
// Bearer sauidhasudh > separando token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
