import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ControllerResponseCode } from '@/enums/controller-response.enum';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      code: ControllerResponseCode.ERROR_INVALID_ROUTE,
      messages: ['There is no resource available for given URL'],
    });
  }
}
