import {
  ExternalMarketItemDetails,
  ExternalMarketItemDetailsAvailability,
  ExternalMarketItemDetailsHistory,
} from '@/interfaces/objects/external-market.interface';

export function mockExternalMarketItemDetails(): ExternalMarketItemDetails {
  return {
    marketConditionList: [mockExternalMarketItemDetailsAvailability()],
    resultMsg: '[{ "days": "2022-10-22", "value": 3000 }]',
    basePrice: 3000,
    biddingSellCount: 1000,
  };
}

export function mockExternalMarketItemDetailsAvailability(): ExternalMarketItemDetailsAvailability {
  return {
    sellCount: 1000,
    buyCount: 0,
    pricePerOne: 3000,
  };
}

export function mockExternalMarketItemDetailsHistory(): ExternalMarketItemDetailsHistory {
  return {
    days: '2022-10-22',
    value: 3000,
  };
}
