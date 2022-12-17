import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ExternalMarketEndpoint } from '@/enums/external-market.enum';
import { HttpHeader } from '@/enums/http.enum';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';

@Injectable()
export class ExternalMarketService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  private readonly matchExternalMarketEndpoint: Record<InternalMarketEndpoint, ExternalMarketEndpoint> = {
    [InternalMarketEndpoint.LIST]: ExternalMarketEndpoint.GET_WORLD_MARKET_LIST,
    [InternalMarketEndpoint.LIST_HOT]: ExternalMarketEndpoint.GET_WORLD_MARKET_HOT_LIST,
    [InternalMarketEndpoint.LIST_QUEUE]: ExternalMarketEndpoint.GET_WORLD_MARKET_WAIT_LIST,
    [InternalMarketEndpoint.ITEM]: ExternalMarketEndpoint.GET_WORLD_MARKET_SUB_LIST,
    [InternalMarketEndpoint.ITEM_DETAILS]: ExternalMarketEndpoint.GET_ITEM_SELL_BUY_INFO,
  };

  public buildRequest(
    endpoint: InternalMarketEndpoint,
    params: ExternalMarketParams,
    meta?: ExternalMarketMeta,
  ): Observable<AxiosResponse> {
    const paramsRequestToken: string = this.configService.get('paramsRequestToken');
    const cookieRequestToken: string = this.configService.get('cookieRequestToken');

    if (!paramsRequestToken || !cookieRequestToken) {
      throw new ExternalMarketException('Request verification tokens are missing');
    }

    if (!meta.region) {
      meta.region = this.configService.get('defaultRequestRegion');
    }

    if (!meta.language) {
      meta.language = this.configService.get('defaultRequestLanguage');
    }

    const url: URL = this.getRequestUrl(this.getRequestEndpoint(endpoint), meta.region);
    const data: URLSearchParams = new URLSearchParams();
    data.append('__RequestVerificationToken', paramsRequestToken);

    for (const [key, value] of Object.entries(params)) {
      data.append(key, value);
    }

    const config: AxiosRequestConfig = {
      headers: {
        [HttpHeader.COOKIE]: `__RequestVerificationToken=${cookieRequestToken}; lang=${meta.language};`,
        [HttpHeader.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
        [HttpHeader.USER_AGENT]: 'BlackDesert',
      },
    };

    return this.httpService.post(url.href, data, config);
  }

  private getRequestUrl(endpoint: string, region: string): URL {
    return new URL(`https://${region}-trade.naeu.playblackdesert.com/Home/${endpoint}`);
  }

  private getRequestEndpoint(endpoint: string): string {
    if (!this.matchExternalMarketEndpoint[endpoint]) {
      throw new ExternalMarketException(`Could not match endpoint ${endpoint} with any external market endpoint`);
    }

    return this.matchExternalMarketEndpoint[endpoint];
  }
}
