import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ControllerResponseCode } from '@/enums/controller-response.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private defaultExceptionStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  private defaultExceptionCode: ControllerResponseCode = ControllerResponseCode.ERROR_INTERNAL;
  private defaultExceptionMessage: string = 'Something went wrong on the server-side';

  public catch(exception: unknown, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse();

    let status: HttpStatus = this.defaultExceptionStatus;
    let code: ControllerResponseCode = this.defaultExceptionCode;
    const messages: string[] = [];

    try {
      if (!messages.length) {
        if (exception instanceof HttpException) {
          status = exception.getStatus();
          code = this.extractExceptionCode(exception);
          messages.push(...this.extractExceptionMessages(exception));
        }

        if (!messages.length) {
          status = this.defaultExceptionStatus;
          code = this.defaultExceptionCode;
          messages.push(this.defaultExceptionMessage);
        }
      }
    } catch {
      status = this.defaultExceptionStatus;
      code = this.defaultExceptionCode;
      messages.push(this.defaultExceptionMessage);
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

    return this.defaultExceptionCode;
  }

  private extractExceptionMessages(exception: HttpException): string[] {
    const responseFromException: string | object = exception.getResponse();

    if (typeof responseFromException === 'string') {
      return [responseFromException];
    }

    if (typeof responseFromException === 'object') {
      return responseFromException['messages'];
    }

    return [this.defaultExceptionMessage];
  }
}
