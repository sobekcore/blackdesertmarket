import { ReadStream, createReadStream, createWriteStream, existsSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import {
  BlackDesertItem,
  BlackDesertItemType,
  BlackDesertItemHot,
  BlackDesertItemQueue,
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemDetailsHistory,
} from '@blackdesertmarket/interfaces';
import {
  ExternalMarketItem,
  ExternalMarketItemType,
  ExternalMarketItemHot,
  ExternalMarketItemQueue,
  ExternalMarketItemDetails,
  ExternalMarketItemDetailsHistory,
  ExternalMarketMeta,
  ExternalMarketParams,
} from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketAsset } from '@/enums/external-market.enum';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly configService: ConfigService,
    private readonly externalMarketService: ExternalMarketService,
  ) {}

  public isValidExternalMarketItem(item: unknown): boolean {
    return (
      item.hasOwnProperty('mainKey') &&
      item.hasOwnProperty('name') &&
      item.hasOwnProperty('sumCount') &&
      item.hasOwnProperty('grade') &&
      item.hasOwnProperty('minPrice')
    );
  }

  public isValidExternalMarketItemType(itemType: unknown): boolean {
    return (
      itemType.hasOwnProperty('mainKey') &&
      itemType.hasOwnProperty('name') &&
      itemType.hasOwnProperty('count') &&
      itemType.hasOwnProperty('grade') &&
      itemType.hasOwnProperty('pricePerOne') &&
      itemType.hasOwnProperty('mainCategory') &&
      itemType.hasOwnProperty('subCategory') &&
      itemType.hasOwnProperty('chooseKey')
    );
  }

  public isValidExternalMarketItemHot(itemHot: unknown): boolean {
    return (
      itemHot.hasOwnProperty('mainKey') &&
      itemHot.hasOwnProperty('name') &&
      itemHot.hasOwnProperty('count') &&
      itemHot.hasOwnProperty('grade') &&
      itemHot.hasOwnProperty('pricePerOne') &&
      itemHot.hasOwnProperty('mainCategory') &&
      itemHot.hasOwnProperty('subCategory') &&
      itemHot.hasOwnProperty('chooseKey') &&
      itemHot.hasOwnProperty('fluctuationType') &&
      itemHot.hasOwnProperty('fluctuationPrice')
    );
  }

  public isValidExternalMarketItemQueue(itemQueue: unknown): boolean {
    return (
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
      itemDetails.hasOwnProperty('marketConditionList') &&
      itemDetails.hasOwnProperty('resultMsg') &&
      itemDetails.hasOwnProperty('basePrice')
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

  public transformExternalMarketItemType(itemType: ExternalMarketItemType): BlackDesertItemType {
    return {
      id: itemType.mainKey,
      name: itemType.name,
      count: itemType.count,
      grade: itemType.grade,
      basePrice: itemType.pricePerOne,
      mainCategory: itemType.mainCategory,
      subCategory: itemType.subCategory,
      enhancement: itemType.chooseKey,
    };
  }

  public transformExternalMarketItemHot(itemHot: ExternalMarketItemHot): BlackDesertItemHot {
    return {
      id: itemHot.mainKey,
      name: itemHot.name,
      count: itemHot.count,
      grade: itemHot.grade,
      basePrice: itemHot.pricePerOne,
      mainCategory: itemHot.mainCategory,
      subCategory: itemHot.subCategory,
      enhancement: itemHot.chooseKey,
      fluctuationType: itemHot.fluctuationType,
      fluctuationPrice: itemHot.fluctuationPrice,
    };
  }

  public transformExternalMarketItemQueue(itemQueue: ExternalMarketItemQueue): BlackDesertItemQueue {
    return {
      id: itemQueue.mainKey,
      name: itemQueue.name,
      count: itemQueue.count,
      grade: itemQueue.grade,
      basePrice: itemQueue._pricePerOne,
      mainCategory: itemQueue.mainCategory,
      subCategory: itemQueue.subCategory,
      enhancement: itemQueue.chooseKey,
      endTime: itemQueue._waitEndTime,
    };
  }

  public transformExternalMarketItemDetails(itemDetails: ExternalMarketItemDetails): BlackDesertItemDetails {
    const availability: BlackDesertItemDetailsAvailability[] = [];
    const history: BlackDesertItemDetailsHistory[] = [];

    const parsedHistory: ExternalMarketItemDetailsHistory[] = JSON.parse(itemDetails.resultMsg);

    for (const oneAvailability of itemDetails.marketConditionList) {
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
      basePrice: itemDetails.basePrice,
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
        map((response: AxiosResponse): unknown[] => {
          return response.data.detailList ? response.data.detailList : [];
        }),
        map((data: unknown[]): BlackDesertItemType[] => {
          data.forEach((itemType: unknown): void => {
            if (!this.isValidExternalMarketItemType(itemType)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemType: ExternalMarketItemType): BlackDesertItemType => {
            return this.transformExternalMarketItemType(itemType);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findIconById(id: number): Promise<ReadStream> {
    const useCache: boolean = this.configService.get('useCache');

    const pathToAsset: string = `cache/images/item/${id}.png`;

    if (useCache && existsSync(pathToAsset)) {
      return new Promise<ReadStream>((resolve): void => {
        resolve(createReadStream(pathToAsset));
      });
    }

    const data: Observable<ReadStream> = this.externalMarketService
      .getExternalMarketAsset(`img/BDO/item/${id}.png`, ExternalMarketAsset.IMAGE)
      .pipe(
        map((response: AxiosResponse): ReadStream => {
          if (useCache) {
            response.data.pipe(createWriteStream(pathToAsset));
          }

          return response.data;
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
        map((response: AxiosResponse): unknown => {
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
