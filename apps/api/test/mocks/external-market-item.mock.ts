import { ExternalMarketItem } from '@/interfaces/objects/external-market.interface';

export function mockExternalMarketItem(): ExternalMarketItem {
  return {
    mainKey: 5600,
    name: 'Weeds',
    sumCount: 10000,
    grade: 0,
    minPrice: 3000,
  };
}
