import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ExternalMarketMeta, ExternalMarketParams, ExternalMarketItem } from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ItemService } from '@/modules/item/item.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Injectable()
export class ListService {
  constructor(private readonly itemService: ItemService, private readonly marketService: ExternalMarketService) {}

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
          data.forEach((item: unknown) => {
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
