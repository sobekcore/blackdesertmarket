import { MockRef, mockRef } from '@test/mocks/ref.mock';
import { MarketApiResponse } from '@/interfaces/market-api-response';

interface MockMarketApiResponse<T> {
  error: MockRef<boolean>;
  data: MockRef<MarketApiResponse<T>>;
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
