import { ArgumentsHost } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

interface MockResponse {
  status: jest.Mock<MockResponse>;
  json: jest.Mock<MockResponse>;
}

export const mockArgumentsHost: ArgumentsHost = {
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToHttp: jest.fn().mockImplementation(
    (): HttpArgumentsHost => ({
      getResponse: jest.fn().mockImplementation(
        (): MockResponse => ({
          status: mockStatus,
          json: mockJson,
        }),
      ),
      getRequest: jest.fn(),
      getNext: jest.fn(),
    }),
  ),
  switchToWs: jest.fn(),
  getType: jest.fn(),
};

export const mockStatus: jest.Mock<MockResponse> = jest.fn().mockImplementation(
  (): MockResponse => ({
    status: mockStatus,
    json: mockJson,
  }),
);

export const mockJson: jest.Mock<MockResponse> = jest.fn().mockImplementation(
  (): MockResponse => ({
    status: mockStatus,
    json: mockJson,
  }),
);
