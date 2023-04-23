import { mockBlackDesertItem } from './black-desert-item';

export function mockBlackDesertItemType() {
  return {
    ...mockBlackDesertItem(),
    mainCategory: 25,
    subCategory: 2,
    enhancement: 0,
    tradeCount: 1000,
  }
}

export function mockBlackDesertItemHot() {
  return {
    ...mockBlackDesertItemType(),
    fluctuationType: 1,
    fluctuationPrice: 500,
  }
}

export function mockBlackDesertItemQueue() {
  return {
    ...mockBlackDesertItemType(),
    endTime: 1666389600,
  }
}
