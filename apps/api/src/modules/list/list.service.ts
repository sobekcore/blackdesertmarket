import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map, lastValueFrom } from 'rxjs';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';

@Injectable()
export class ListService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * TODO: Extract request parameters/config/response logic to generic classes
   */
  findByCategory(mainCategory: number, subCategory: number, language?: string): Promise<BlackDesertItem[]> {
    if (!language) {
      language = process.env.DEFAULT_REQUEST_LANGUAGE || 'en-US';
    }

    const params: URLSearchParams = new URLSearchParams();

    params.append('__RequestVerificationToken', process.env.PARAMS_REQUEST_TOKEN);
    params.append('mainCategory', String(mainCategory));
    params.append('subCategory', String(subCategory));

    const config: Record<string, Record<string, string>> = {
      headers: {
        Cookie: `__RequestVerificationToken=${process.env.COOKIE_REQUEST_TOKEN}; lang=${language};`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'BlackDesert',
      },
    };

    const data: Observable<BlackDesertItem[]> = this.httpService
      .post('https://eu-trade.naeu.playblackdesert.com/Home/GetWorldMarketList', params, config)
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
