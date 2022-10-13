import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  BlackDesertItem,
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemDetailsHistory,
} from '@blackdesertmarket/interfaces';
import {
  ExternalMarketItem,
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

  public findById(id: number, enhancement: number, region?: string, language?: string): Promise<any> {
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
      .buildExternalMarketRequest(InternalMarketEndpoint.ITEM, params, meta)
      .pipe(
        map((response): unknown => {
          return response.data ? response.data : {};
        }),
        map((data: unknown): BlackDesertItemDetails => {
          if (!this.isValidExternalMarketItemDetails(data)) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          /**
           * At this point we are certain that data implements all the members of ExternalMarketItemDetails
           * which is the assurance we need to safely explicitly cast it to ExternalMarketItemDetails
           */
          return this.transformExternalMarketItemDetails(data as ExternalMarketItemDetails);
        }),
      );

    return lastValueFrom(data);
  }
}
