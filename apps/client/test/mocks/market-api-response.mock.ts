import { MockRef, mockRef } from '@test/mocks/ref.mock';
import { MarketApiResponse } from '@/interfaces/market-api-response';

interface MockMarketApiResponse<T, C = false> {
  error: MockRef<boolean>;
  data: MockRef<C extends true ? T : MarketApiResponse<T>>;
}

export function mockMarketApiResponse<T>(data: T): Promise<MockMarketApiResponse<T>> {
  return Promise.resolve({
    error: mockRef<boolean>(false),
    data: mockRef<MarketApiResponse<T>>({
      code: 'SUCCESS',
      data: data,
    }),
  });
}

export function mockCustomMarketApiResponse<T>(data: T): Promise<MockMarketApiResponse<T, true>> {
  return Promise.resolve({
    error: mockRef<boolean>(false),
    data: mockRef<T>(data),
  });
}
