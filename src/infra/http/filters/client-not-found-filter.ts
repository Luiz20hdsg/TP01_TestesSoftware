import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';

@Catch(ClientNotFoundException)
export class ClientNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ClientNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 404;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
