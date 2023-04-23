import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemValidatorService {
  public isValidExternalMarketItem(item: unknown): boolean {
    return (
      item &&
      item.hasOwnProperty('mainKey') &&
      item.hasOwnProperty('name') &&
      item.hasOwnProperty('sumCount') &&
      item.hasOwnProperty('grade') &&
      item.hasOwnProperty('minPrice')
    );
  }

  public isValidExternalMarketItemSearch(itemSearch: unknown): boolean {
    return (
      itemSearch &&
      itemSearch.hasOwnProperty('mainKey') &&
      itemSearch.hasOwnProperty('name') &&
      itemSearch.hasOwnProperty('sumCount') &&
      itemSearch.hasOwnProperty('grade') &&
      itemSearch.hasOwnProperty('totalSumCount')
    );
  }

  public isValidExternalMarketItemType(itemType: unknown): boolean {
    return (
      itemType &&
      itemType.hasOwnProperty('mainKey') &&
      itemType.hasOwnProperty('name') &&
      itemType.hasOwnProperty('count') &&
      itemType.hasOwnProperty('grade') &&
      itemType.hasOwnProperty('pricePerOne') &&
      itemType.hasOwnProperty('mainCategory') &&
      itemType.hasOwnProperty('subCategory') &&
      itemType.hasOwnProperty('chooseKey') &&
      itemType.hasOwnProperty('totalTradeCount')
    );
  }

  public isValidExternalMarketItemHot(itemHot: unknown): boolean {
    return (
      itemHot &&
      itemHot.hasOwnProperty('mainKey') &&
      itemHot.hasOwnProperty('name') &&
      itemHot.hasOwnProperty('count') &&
      itemHot.hasOwnProperty('grade') &&
      itemHot.hasOwnProperty('pricePerOne') &&
      itemHot.hasOwnProperty('mainCategory') &&
      itemHot.hasOwnProperty('subCategory') &&
      itemHot.hasOwnProperty('chooseKey') &&
      itemHot.hasOwnProperty('totalTradeCount') &&
      itemHot.hasOwnProperty('fluctuationType') &&
      itemHot.hasOwnProperty('fluctuationPrice')
    );
  }

  public isValidExternalMarketItemQueue(itemQueue: unknown): boolean {
    return (
      itemQueue &&
      itemQueue.hasOwnProperty('mainKey') &&
      itemQueue.hasOwnProperty('name') &&
      itemQueue.hasOwnProperty('count') &&
      itemQueue.hasOwnProperty('grade') &&
      itemQueue.hasOwnProperty('_pricePerOne') &&
      itemQueue.hasOwnProperty('mainCategory') &&
      itemQueue.hasOwnProperty('subCategory') &&
      itemQueue.hasOwnProperty('chooseKey') &&
      itemQueue.hasOwnProperty('_waitEndTime')
    );
  }

  public isValidExternalMarketItemDetails(itemDetails: unknown): boolean {
    return (
      itemDetails &&
      itemDetails.hasOwnProperty('marketConditionList') &&
      itemDetails.hasOwnProperty('resultMsg') &&
      itemDetails.hasOwnProperty('basePrice') &&
      itemDetails.hasOwnProperty('biddingSellCount')
    );
  }

  public isValidExternalMarketRawItemDetails(itemDetails: unknown): boolean {
    return itemDetails && itemDetails.hasOwnProperty('resultMsg');
  }
}
