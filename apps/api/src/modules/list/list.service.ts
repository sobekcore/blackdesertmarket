import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ExternalMarketMeta, ExternalMarketParams, ExternalMarketItem } from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ItemService } from '@/modules/item/item.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Injectable()
export class ListService {
  constructor(
    private readonly httpService: HttpService,
    private readonly itemService: ItemService,
    private readonly marketService: ExternalMarketService,
  ) {}

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
        map((response): Array<unknown> => {
          return response.data.marketList ? response.data.marketList : [];
        }),
        map((data: Array<unknown>): BlackDesertItem[] => {
          data.forEach((item: unknown) => {
            if (!this.itemService.isValidExternalMarketItem(item)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          /**
           * Native JavaScript map method must be used here instead of rxjs map function
           * due to how HttpService returns response data as a single rxjs stream
           */
          return data.map((item: ExternalMarketItem): BlackDesertItem => {
            return this.itemService.transformExternalMarketItem(item);
          });
        }),
      );

    return lastValueFrom(data);
  }
}
