import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ExternalMarketRawEndpoint } from '@/enums/external-market-raw.enum';
import { HttpHeader } from '@/enums/http.enum';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';

@Injectable()
export class ExternalMarketRawService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  private readonly matchExternalMarketRawEndpoint: Record<InternalMarketEndpoint, ExternalMarketRawEndpoint> = {
    [InternalMarketEndpoint.LIST]: null,
    [InternalMarketEndpoint.LIST_HOT]: null,
    [InternalMarketEndpoint.LIST_QUEUE]: null,
    [InternalMarketEndpoint.ITEM]: null,
    [InternalMarketEndpoint.ITEM_DETAILS]: ExternalMarketRawEndpoint.GET_WORLD_MARKET_SUB_LIST,
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

  private getRequestUrl(endpoint: string, region: string): URL {
    return new URL(`https://${region}-trade.naeu.playblackdesert.com/Trademarket/${endpoint}`);
  }

  private getRequestEndpoint(endpoint: string): string {
    if (!this.matchExternalMarketRawEndpoint[endpoint]) {
      throw new ExternalMarketException(`Could not match endpoint ${endpoint} with any external market endpoint`);
    }

    return this.matchExternalMarketRawEndpoint[endpoint];
  }
}
