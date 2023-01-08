import {
  ExternalMarketItemHot,
  ExternalMarketItemQueue,
  ExternalMarketItemType,
} from '@/interfaces/external-market.interface';

export function mockExternalMarketItemType(): ExternalMarketItemType {
  return {
    mainKey: 5600,
    name: 'Weeds',
    count: 10000,
    grade: 0,
    pricePerOne: 3000,
    mainCategory: 25,
    subCategory: 2,
    chooseKey: 0,
    totalTradeCount: 1000,
  };
}

export function mockExternalMarketItemHot(): ExternalMarketItemHot {
  return {
    mainKey: 5600,
    name: 'Weeds',
    count: 10000,
    grade: 0,
    pricePerOne: 3000,
    mainCategory: 25,
    subCategory: 2,
    chooseKey: 0,
    totalTradeCount: 1000,
    fluctuationType: 1,
    fluctuationPrice: 500,
  };
}

export function mockExternalMarketItemQueue(): ExternalMarketItemQueue {
  return {
    mainKey: 5600,
    name: 'Weeds',
    count: 10000,
    grade: 0,
    _pricePerOne: 3000,
    mainCategory: 25,
    subCategory: 2,
    chooseKey: 0,
    _waitEndTime: 1666389600,
  };
}
