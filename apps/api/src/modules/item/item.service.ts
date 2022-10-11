import { Injectable } from '@nestjs/common';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ExternalMarketItem } from '@/interfaces/external-market.interface';

@Injectable()
export class ItemService {
  public isValidExternalMarketItem(item: unknown): boolean {
    return (
      item.hasOwnProperty('mainKey') &&
      item.hasOwnProperty('name') &&
      item.hasOwnProperty('sumCount') &&
      item.hasOwnProperty('grade') &&
      item.hasOwnProperty('minPrice')
    );
  }

  public transformExternalMarketItem(item: ExternalMarketItem): BlackDesertItem {
    return {
      id: item.mainKey,
      name: item.name,
      count: item.sumCount,
      grade: item.grade,
      price: item.minPrice,
    };
  }
}
