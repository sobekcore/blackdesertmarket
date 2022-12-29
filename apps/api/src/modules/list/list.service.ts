import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { BlackDesertItem, BlackDesertItemHot, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { AxiosResponse } from 'axios';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  ExternalMarketItem,
  ExternalMarketItemHot,
  ExternalMarketItemQueue,
  ExternalMarketMeta,
  ExternalMarketParams,
} from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ExternalMarketRequestPath } from '@/enums/external-market.enum';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';
import { ItemService } from '@/modules/item/item.service';

@Injectable()
export class ListService {
  constructor(private readonly itemService: ItemService, private readonly marketService: ExternalMarketService) {}

  public findHotItems(region?: string, language?: string): Promise<BlackDesertItemHot[]> {
    const meta: ExternalMarketMeta = {
      region: region,
      language: language,
    };

    const data: Observable<BlackDesertItemHot[]> = this.marketService
      .buildRequest(InternalMarketEndpoint.LIST_HOT, {}, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data.hotList ? response.data.hotList : [];
        }),
        map((data: unknown[]): BlackDesertItemHot[] => {
          if (!data.length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          data.forEach((itemHot: unknown): void => {
            if (!this.itemService.isValidExternalMarketItemHot(itemHot)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemHot: ExternalMarketItemHot): BlackDesertItemHot => {
            return this.itemService.transformExternalMarketItemHot(itemHot);
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
      .buildRequest(InternalMarketEndpoint.LIST_QUEUE, {}, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data._waitList ? response.data._waitList : [];
        }),
        map((data: unknown[]): BlackDesertItemQueue[] => {
          if (!data.length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

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
      .buildRequest(InternalMarketEndpoint.LIST, params, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data.marketList ? response.data.marketList : [];
        }),
        map((data: unknown[]): BlackDesertItem[] => {
          if (!data.length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

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
