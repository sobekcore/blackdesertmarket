import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { BlackDesertItem, BlackDesertItemHot, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { AxiosResponse } from 'axios';
import { I18nContext } from 'nestjs-i18n';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  ExternalMarketItem,
  ExternalMarketItemHot,
  ExternalMarketItemQueue,
  ExternalMarketMeta,
  ExternalMarketParams,
} from '@/interfaces/objects/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ExternalMarketEndpoint, ExternalMarketRequestPath } from '@/enums/external-market.enum';
import { RegionContext } from '@/contexts/region.context';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';

@Injectable()
export class ListService {
  constructor(
    private readonly itemValidatorService: ItemValidatorService,
    private readonly itemTransformerService: ItemTransformerService,
    private readonly marketService: ExternalMarketService,
  ) {}

  public findHotItems(region: RegionContext, i18n: I18nContext): Promise<BlackDesertItemHot[]> {
    const meta: ExternalMarketMeta = {
      region: region.code,
      language: i18n.lang,
    };

    const data: Observable<BlackDesertItemHot[]> = this.marketService
      .buildRequest(ExternalMarketEndpoint.LIST_HOT, {}, meta)
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
            if (!this.itemValidatorService.isValidExternalMarketItemHot(itemHot)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemHot: ExternalMarketItemHot): BlackDesertItemHot => {
            return this.itemTransformerService.transformExternalMarketItemHot(itemHot);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findQueueItems(region: RegionContext, i18n: I18nContext): Promise<BlackDesertItemQueue[]> {
    const meta: ExternalMarketMeta = {
      region: region.code,
      language: i18n.lang,
    };

    const data: Observable<BlackDesertItemQueue[]> = this.marketService
      .buildRequest(ExternalMarketEndpoint.LIST_QUEUE, {}, meta)
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
            if (!this.itemValidatorService.isValidExternalMarketItemQueue(itemQueue)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemQueue: ExternalMarketItemQueue): BlackDesertItemQueue => {
            return this.itemTransformerService.transformExternalMarketItemQueue(itemQueue);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findByCategory(
    region: RegionContext,
    i18n: I18nContext,
    mainCategory: number,
    subCategory: number,
  ): Promise<BlackDesertItem[]> {
    const params: ExternalMarketParams = {
      mainCategory: String(mainCategory),
      subCategory: String(subCategory),
    };

    const meta: ExternalMarketMeta = {
      region: region.code,
      language: i18n.lang,
    };

    const data: Observable<BlackDesertItem[]> = this.marketService
      .buildRequest(ExternalMarketEndpoint.LIST, params, meta)
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
            if (!this.itemValidatorService.isValidExternalMarketItem(item)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((item: ExternalMarketItem): BlackDesertItem => {
            return this.itemTransformerService.transformExternalMarketItem(item);
          });
        }),
      );

    return lastValueFrom(data);
  }
}
