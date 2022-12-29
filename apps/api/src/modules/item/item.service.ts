import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BlackDesertItem,
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemDetailsExtended,
  BlackDesertItemDetailsHistory,
  BlackDesertItemHot,
  BlackDesertItemQueue,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { AxiosResponse } from 'axios';
import { ReadStream, createReadStream, createWriteStream, existsSync } from 'fs';
import { Observable, lastValueFrom, map } from 'rxjs';
import { BlackDesertItemDetailsExtendedOnly } from '@/interfaces/black-desert-item-details.interface';
import {
  ExternalMarketRawItemDetails,
  ExternalMarketRawItemDetailsElement,
} from '@/interfaces/external-market-raw.interface';
import {
  ExternalMarketItem,
  ExternalMarketItemDetails,
  ExternalMarketItemDetailsHistory,
  ExternalMarketItemHot,
  ExternalMarketItemQueue,
  ExternalMarketItemType,
  ExternalMarketMeta,
  ExternalMarketParams,
} from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ExternalMarketAsset } from '@/enums/external-market-asset.enum';
import { ExternalMarketRequestPath } from '@/enums/external-market.enum';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketAssetService } from '@/modules/external-market/external-market-asset.service';
import { ExternalMarketRawService } from '@/modules/external-market/external-market-raw.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly configService: ConfigService,
    private readonly externalMarketService: ExternalMarketService,
    private readonly externalMarketRawService: ExternalMarketRawService,
    private readonly externalMarketAssetService: ExternalMarketAssetService,
  ) {}

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
      itemQueue.hasOwnProperty('totalTradeCount') &&
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
      tradeCount: itemType.totalTradeCount,
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
      tradeCount: itemHot.totalTradeCount,
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
      tradeCount: itemQueue.totalTradeCount,
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
      sellCount: itemDetails.biddingSellCount,
    };
  }

  public transformExternalMarketRawItemDetails(
    itemDetails: ExternalMarketRawItemDetails,
    enhancement: number,
  ): BlackDesertItemDetailsExtendedOnly {
    const parsedDetails: ExternalMarketRawItemDetailsElement[] = itemDetails.resultMsg
      .split('|')
      .map((element: string): ExternalMarketRawItemDetailsElement => {
        return Object.fromEntries(Object.entries(element.split('-')));
      });

    for (const oneDetails of parsedDetails) {
      const oneDetailsEnhancement: number = Number(oneDetails['1']);
      const oneDetailsRecentPrice: number = Number(oneDetails['8']);
      const oneDetailsRecentTransaction: number = Number(oneDetails['9']);

      if (oneDetailsEnhancement !== enhancement) {
        continue;
      }

      return {
        recentPrice: oneDetailsRecentPrice,
        recentTransaction: oneDetailsRecentTransaction,
      };
    }
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
      .buildRequest(InternalMarketEndpoint.ITEM, params, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data.detailList ? response.data.detailList : [];
        }),
        map((data: unknown[]): BlackDesertItemType[] => {
          if (!data.length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

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

    const data: Observable<ReadStream> = this.externalMarketAssetService
      .buildRequest(`img/BDO/item/${id}.png`, ExternalMarketAsset.IMAGE)
      .pipe(
        map((response: AxiosResponse): ReadStream => {
          if (!Object.keys(response.data).length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          if (useCache) {
            response.data.pipe(createWriteStream(pathToAsset));
          }

          return response.data;
        }),
      );

    return lastValueFrom(data);
  }

  public async findDetailsById(
    id: number,
    enhancement: number,
    extended?: boolean,
    region?: string,
    language?: string,
  ): Promise<BlackDesertItemDetails | BlackDesertItemDetailsExtended> {
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

    let data: BlackDesertItemDetails | BlackDesertItemDetailsExtended = await lastValueFrom(
      this.externalMarketService.buildRequest(InternalMarketEndpoint.ITEM_DETAILS, params, meta).pipe(
        map((response: AxiosResponse): unknown => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data ? response.data : {};
        }),
        map((data: unknown): BlackDesertItemDetails => {
          if (!this.isValidExternalMarketItemDetails(data)) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          return this.transformExternalMarketItemDetails(data as ExternalMarketItemDetails);
        }),
      ),
    );

    if (extended) {
      const additional: BlackDesertItemDetailsExtendedOnly = await lastValueFrom(
        this.externalMarketRawService.buildRequest(InternalMarketEndpoint.ITEM_DETAILS, params, meta).pipe(
          map((response: AxiosResponse): unknown => {
            if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
              throw new ServiceUnavailableException({
                code: ControllerResponseCode.MAINTENANCE,
                messages: ['Currently external market is in the maintenance'],
              });
            }

            return response.data ? response.data : '';
          }),
          map((additional: unknown): BlackDesertItemDetailsExtendedOnly => {
            if (!this.isValidExternalMarketRawItemDetails(additional)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }

            return this.transformExternalMarketRawItemDetails(additional as ExternalMarketRawItemDetails, enhancement);
          }),
        ),
      );

      data = {
        ...data,
        ...additional,
      };
    }

    return data;
  }
}
