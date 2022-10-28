import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BlackDesertItem, BlackDesertItemQueue, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import {
  ExternalMarketMeta,
  ExternalMarketParams,
  ExternalMarketItem,
  ExternalMarketItemType,
  ExternalMarketItemQueue,
} from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ItemService } from '@/modules/item/item.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Injectable()
export class ListService {
  constructor(private readonly itemService: ItemService, private readonly marketService: ExternalMarketService) {}

  public findHotItems(region?: string, language?: string): Promise<BlackDesertItemType[]> {
    const meta: ExternalMarketMeta = {
      region: region,
      language: language,
    };

    const data: Observable<BlackDesertItemType[]> = this.marketService
      .buildExternalMarketRequest(InternalMarketEndpoint.LIST_HOT, {}, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          return response.data.hotList ? response.data.hotList : [];
        }),
        map((data: unknown[]): BlackDesertItemType[] => {
          data.forEach((itemType: unknown): void => {
            if (!this.itemService.isValidExternalMarketItemType(itemType)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemType: ExternalMarketItemType): BlackDesertItemType => {
            return this.itemService.transformExternalMarketItemType(itemType);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findQueueItems(region?: string, language?: string): Promise<BlackDesertItemQueue[]> {
    const meta: ExternalMarketMeta = {
      region: region,
      language: language,
    };

    const data: Observable<BlackDesertItemQueue[]> = this.marketService
      .buildExternalMarketRequest(InternalMarketEndpoint.LIST_QUEUE, {}, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          return response.data._waitList ? response.data._waitList : [];
        }),
        map((data: unknown[]): BlackDesertItemQueue[] => {
          data.forEach((itemQueue: unknown): void => {
            if (!this.itemService.isValidExternalMarketItemQueue(itemQueue)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemQueue: ExternalMarketItemQueue): BlackDesertItemQueue => {
            return this.itemService.transformExternalMarketItemQueue(itemQueue);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findByCategory(
    mainCategory: number,
    subCategory: number,
    region?: string,
    language?: string,
  ): Promise<BlackDesertItem[]> {
    const params: ExternalMarketParams = {
      mainCategory: String(mainCategory),
      subCategory: String(subCategory),
    };

    const meta: ExternalMarketMeta = {
      region: region,
      language: language,
    };

    const data: Observable<BlackDesertItem[]> = this.marketService
      .buildExternalMarketRequest(InternalMarketEndpoint.LIST, params, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          return response.data.marketList ? response.data.marketList : [];
        }),
        map((data: unknown[]): BlackDesertItem[] => {
          data.forEach((item: unknown): void => {
            if (!this.itemService.isValidExternalMarketItem(item)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((item: ExternalMarketItem): BlackDesertItem => {
            return this.itemService.transformExternalMarketItem(item);
          });
        }),
      );

    return lastValueFrom(data);
  }
}
