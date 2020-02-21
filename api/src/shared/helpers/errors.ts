import { HttpException, HttpStatus } from '@nestjs/common';

export function unauthorizedUserException(message?: string) {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      error: message || 'You are not logged in!',
    },
    401,
  );
}
