import { AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { HttpStatus } from '@nestjs/common';
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
