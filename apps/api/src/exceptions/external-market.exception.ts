import { HttpException, HttpStatus } from '@nestjs/common';

export class ExternalMarketException extends HttpException {
  constructor(response: string) {
    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
