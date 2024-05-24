import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';
export declare class ClientNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: ClientNotFoundException, host: ArgumentsHost): void;
}
