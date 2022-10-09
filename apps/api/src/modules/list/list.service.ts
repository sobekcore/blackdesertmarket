import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/external-market.interface';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Injectable()
export class ListService {
  constructor(private readonly httpService: HttpService, private readonly marketService: ExternalMarketService) {}

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
      )
      .pipe(
        map((data: Array<unknown>): BlackDesertItem[] => {
          /**
           * TODO: Add transformer to adjust items data structure
           */
          return data as BlackDesertItem[];
        }),
      );

    return lastValueFrom(data);
  }
}
