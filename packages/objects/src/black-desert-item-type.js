import { isValidBlackDesertItem } from './black-desert-item';

export function isValidBlackDesertItemType(itemType) {
  return (
    isValidBlackDesertItem(itemType) &&
    itemType.hasOwnProperty('mainCategory') &&
    itemType.hasOwnProperty('subCategory') &&
    itemType.hasOwnProperty('enhancement') &&
    itemType.hasOwnProperty('tradeCount')
  );
}

export function isValidBlackDesertItemHot(itemHot) {
  return (
    isValidBlackDesertItemType(itemHot) &&
    itemHot.hasOwnProperty('fluctuationType') &&
    itemHot.hasOwnProperty('fluctuationPrice')
  );
}

export function isValidBlackDesertItemQueue(itemQueue) {
  return (
    isValidBlackDesertItemType(itemQueue) &&
    itemQueue.hasOwnProperty('endTime')
  );
}
