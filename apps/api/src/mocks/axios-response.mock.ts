import { STATUS_CODES } from 'http';
import { HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';

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
