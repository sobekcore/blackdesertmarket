import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/objects/external-market.interface';
import { ExternalMarketRawEndpoint } from '@/enums/external-market-raw.enum';
import { HttpHeader } from '@/enums/http.enum';

@Injectable()
export class ExternalMarketRawService {
  constructor(private readonly httpService: HttpService) {}

  public buildRequest(
    endpoint: ExternalMarketRawEndpoint,
    params: ExternalMarketParams,
    meta: ExternalMarketMeta,
  ): Observable<AxiosResponse> {
    const url: URL = this.getRequestUrl(endpoint, meta.region);
    const data: URLSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      data.append(key, value);
    }

    const config: AxiosRequestConfig = {
      headers: {
        [HttpHeader.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
        [HttpHeader.USER_AGENT]: 'BlackDesert',
      },
    };

    return this.httpService.post(url.href, data, config);
  }

  private getRequestUrl(endpoint: ExternalMarketRawEndpoint, region: string): URL {
    return new URL(`https://${region}-trade.naeu.playblackdesert.com/Trademarket/${endpoint}`);
  }
}
