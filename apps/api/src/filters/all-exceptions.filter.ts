import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ControllerResponseCode } from '@/enums/controller-response.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: ControllerResponseCode = ControllerResponseCode.ERROR_INTERNAL;
    const messages: string[] = [];

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      code = ControllerResponseCode.ERROR_INVALID_ROUTE;
      messages.push('There is no resource available for given URL');
    }

    if (!messages.length) {
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        code = this.extractExceptionCode(exception);
        messages.push(...this.extractExceptionMessages(exception));
      }

      if (!messages.length) {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        code = ControllerResponseCode.ERROR_INTERNAL;
        messages.push('Something went wrong on the server-side');
      }
    }

    response.status(status).json({
      code: code,
      messages: messages,
    });
  }

  private extractExceptionCode(exception: HttpException): ControllerResponseCode {
    const responseFromException: string | object = exception.getResponse();

    if (typeof responseFromException === 'object') {
      return responseFromException['code'];
    }

    return ControllerResponseCode.ERROR_INTERNAL;
  }

  private extractExceptionMessages(exception: HttpException): string[] {
    const responseFromException: string | object = exception.getResponse();

    if (typeof responseFromException === 'string') {
      return [responseFromException];
    }

    if (typeof responseFromException === 'object') {
      return responseFromException['messages'];
    }

    return ['Something went wrong on the server-side'];
  }
}
