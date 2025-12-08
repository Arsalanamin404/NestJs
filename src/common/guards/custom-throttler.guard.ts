import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(context: ExecutionContext): Promise<void> {
    const req = context.switchToHttp().getRequest<Request>();
    const path = req.url;

    const responseBody = {
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      path,
      method: req.method,
      timestamp: new Date().toISOString(),
    };

    throw new HttpException(responseBody, HttpStatus.TOO_MANY_REQUESTS);
  }
}
