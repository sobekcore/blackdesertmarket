import { AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { I18nContext } from 'nestjs-i18n';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  ExternalMarketItemSearch,
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
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly itemValidatorService: ItemValidatorService,
    private readonly itemTransformerService: ItemTransformerService,
    private readonly externalMarketService: ExternalMarketService,
  ) {}

  public findBySearch(region: RegionContext, i18n: I18nContext, search: string): Promise<BlackDesertItem[]> {
    const params: ExternalMarketParams = {
      searchText: String(search),
    };

    const meta: ExternalMarketMeta = {
      region: region.code,
      language: i18n.lang,
    };

    const data: Observable<BlackDesertItem[]> = this.externalMarketService
      .buildRequest(ExternalMarketEndpoint.SEARCH, params, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data.list ? response.data.list : [];
        }),
        map((data: unknown[]): BlackDesertItem[] => {
          data.forEach((itemSearch: unknown): void => {
            if (!this.itemValidatorService.isValidExternalMarketItemSearch(itemSearch)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemSearch: ExternalMarketItemSearch): BlackDesertItem => {
            return this.itemTransformerService.transformExternalMarketItemSearch(itemSearch);
          });
        }),
      );

    return lastValueFrom(data);
  }
}
