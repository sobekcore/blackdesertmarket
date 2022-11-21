import { HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { STATUS_CODES } from 'http';

export function mockAxiosResponse(data: any): AxiosResponse {
  return {
    data: data,
    status: HttpStatus.OK,
    statusText: STATUS_CODES[HttpStatus.OK],
    headers: {},
    config: {},
    request: {},
  };
}
