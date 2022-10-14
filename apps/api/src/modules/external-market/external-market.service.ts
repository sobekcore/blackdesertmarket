import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ExternalMarketParams, ExternalMarketMeta } from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { HttpHeader } from '@/enums/http.enum';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketEndpoint } from '@/enums/external-market.enum';

@Injectable()
export class ExternalMarketService {
  constructor(private readonly httpService: HttpService) {}

  private readonly matchExternalEndpoint: Record<InternalMarketEndpoint, ExternalMarketEndpoint> = {
    [InternalMarketEndpoint.LIST]: ExternalMarketEndpoint.GET_WORLD_MARKET_LIST,
    [InternalMarketEndpoint.ITEM_TYPES]: ExternalMarketEndpoint.GET_WORLD_MARKET_SUB_LIST,
    [InternalMarketEndpoint.ITEM_DETAILS]: ExternalMarketEndpoint.GET_ITEM_SELL_BUY_INFO,
  };

  /**
   * TODO: Change return type Observable<any> to Observable<AxiosResponse>
   */
  public buildExternalMarketRequest(
    endpoint: InternalMarketEndpoint,
    params: ExternalMarketParams,
    meta?: ExternalMarketMeta,
  ): Observable<any> {
    const paramsRequestToken: string = process.env.PARAMS_REQUEST_TOKEN;
    const cookieRequestToken: string = process.env.COOKIE_REQUEST_TOKEN;

    if (!paramsRequestToken || !cookieRequestToken) {
      throw new ExternalMarketException('Request verification tokens are missing');
    }

    if (!meta.region) {
      meta.region = process.env.DEFAULT_REQUEST_REGION || 'eu';
    }

    if (!meta.language) {
      meta.language = process.env.DEFAULT_REQUEST_LANGUAGE || 'en-US';
    }

    const url: URL = this.getExternalMarketUrl(this.getExternalMarketEndpoint(endpoint), meta.region);

    const data: URLSearchParams = new URLSearchParams();
    data.append('__RequestVerificationToken', paramsRequestToken);

    for (const [key, value] of Object.entries(params)) {
      data.append(key, value);
    }

    const config: Record<string, Record<HttpHeader, string>> = {
      headers: {
        [HttpHeader.COOKIE]: `__RequestVerificationToken=${cookieRequestToken}; lang=${meta.language};`,
        [HttpHeader.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
        [HttpHeader.USER_AGENT]: 'BlackDesert',
      },
    };

    return this.httpService.post(url.href, data, config);
  }

  private getExternalMarketUrl(endpoint: string, region: string): URL {
    return new URL(`https://${region}-trade.naeu.playblackdesert.com/Home/${endpoint}`);
  }

  private getExternalMarketEndpoint(endpoint: string): string {
    if (!this.matchExternalEndpoint[endpoint]) {
      throw new ExternalMarketException(`Could not match endpoint ${endpoint} with any external endpoint`);
    }

    return this.matchExternalEndpoint[endpoint];
  }
}
