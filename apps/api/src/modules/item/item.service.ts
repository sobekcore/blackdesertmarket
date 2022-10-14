import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  BlackDesertItem,
  BlackDesertItemType,
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemDetailsHistory,
} from '@blackdesertmarket/interfaces';
import {
  ExternalMarketItem,
  ExternalMarketItemType,
  ExternalMarketItemDetails,
  ExternalMarketItemDetailsHistory,
  ExternalMarketMeta,
  ExternalMarketParams,
} from '@/interfaces/external-market.interface';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';
import { ExternalMarketException } from '@/exceptions/external-market.exception';

@Injectable()
export class ItemService {
  constructor(private readonly externalMarketService: ExternalMarketService) {}

  public isValidExternalMarketItem(item: unknown): boolean {
    return (
      item.hasOwnProperty('mainKey') &&
      item.hasOwnProperty('name') &&
      item.hasOwnProperty('sumCount') &&
      item.hasOwnProperty('grade') &&
      item.hasOwnProperty('minPrice')
    );
  }

  public isValidExternalMarketItemType(type: unknown): boolean {
    return (
      type.hasOwnProperty('mainKey') &&
      type.hasOwnProperty('name') &&
      type.hasOwnProperty('count') &&
      type.hasOwnProperty('grade') &&
      type.hasOwnProperty('pricePerOne') &&
      type.hasOwnProperty('subKey')
    );
  }

  public isValidExternalMarketItemDetails(details: unknown): boolean {
    return (
      details.hasOwnProperty('marketConditionList') &&
      details.hasOwnProperty('resultMsg') &&
      details.hasOwnProperty('basePrice')
    );
  }

  public transformExternalMarketItem(item: ExternalMarketItem): BlackDesertItem {
    return {
      id: item.mainKey,
      name: item.name,
      count: item.sumCount,
      grade: item.grade,
      basePrice: item.minPrice,
    };
  }

  public transformExternalMarketItemType(type: ExternalMarketItemType): BlackDesertItemType {
    return {
      id: type.mainKey,
      name: type.name,
      count: type.count,
      grade: type.grade,
      basePrice: type.pricePerOne,
      enhancement: type.subKey,
    };
  }

  public transformExternalMarketItemDetails(details: ExternalMarketItemDetails): BlackDesertItemDetails {
    const availability: BlackDesertItemDetailsAvailability[] = [];
    const history: BlackDesertItemDetailsHistory[] = [];

    const parsedHistory: ExternalMarketItemDetailsHistory[] = JSON.parse(details.resultMsg);

    for (const oneAvailability of details.marketConditionList) {
      availability.push({
        sellCount: oneAvailability.sellCount,
        buyCount: oneAvailability.buyCount,
        onePrice: oneAvailability.pricePerOne,
      });
    }

    for (const oneHistory of parsedHistory) {
      history.push({
        date: oneHistory.days,
        onePrice: oneHistory.value,
      });
    }

    return {
      availability: availability,
      history: history,
      basePrice: details.basePrice,
    };
  }

  public findTypesById(id: number, region?: string, language?: string): Promise<BlackDesertItemType[]> {
    const params: ExternalMarketParams = {
      mainKey: String(id),
    };

    const meta: ExternalMarketMeta = {
      region: region,
      language: language,
    };

    const data: Observable<BlackDesertItemType[]> = this.externalMarketService
      .buildExternalMarketRequest(InternalMarketEndpoint.ITEM_TYPES, params, meta)
      .pipe(
        map((response): unknown[] => {
          return response.data.detailList ? response.data.detailList : [];
        }),
        map((data: unknown[]): BlackDesertItemType[] => {
          data.forEach((type: unknown) => {
            if (!this.isValidExternalMarketItemType(type)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((type: ExternalMarketItemType): BlackDesertItemType => {
            return this.transformExternalMarketItemType(type);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findDetailsById(
    id: number,
    enhancement: number,
    region?: string,
    language?: string,
  ): Promise<BlackDesertItemDetails> {
    const params: ExternalMarketParams = {
      mainKey: String(id),
      subKey: String(enhancement),
      keyType: String(0),
      isUp: String(true),
    };

    const meta: ExternalMarketMeta = {
      region: region,
      language: language,
    };

    const data: Observable<BlackDesertItemDetails> = this.externalMarketService
      .buildExternalMarketRequest(InternalMarketEndpoint.ITEM_DETAILS, params, meta)
      .pipe(
        map((response): unknown => {
          return response.data ? response.data : {};
        }),
        map((data: unknown): BlackDesertItemDetails => {
          if (!this.isValidExternalMarketItemDetails(data)) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          return this.transformExternalMarketItemDetails(data as ExternalMarketItemDetails);
        }),
      );

    return lastValueFrom(data);
  }
}
