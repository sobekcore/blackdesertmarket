import { ExternalMarketItemSearch } from '@/interfaces/objects/external-market.interface';

export function mockExternalMarketItemSearch(): ExternalMarketItemSearch {
  return {
    mainKey: 5600,
    name: 'Weeds',
    sumCount: 10000,
    grade: 0,
    totalSumCount: 3000,
  };
}
