import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ControllerResponseCode } from '@/enums/controller-response.enum';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  public catch(exception: BadRequestException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse();

    response.status(HttpStatus.BAD_REQUEST).json({
      code: ControllerResponseCode.ERROR_INVALID_PARAMETERS,
      messages: [exception.message],
    });
  }
}
