import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { HttpHeader } from '@/enums/http.enum';
import { InternalMarketEndpoint } from '@/enums/internal-market.enum';
import { ExternalMarketAsset, ExternalMarketEndpoint } from '@/enums/external-market.enum';

@Injectable()
export class ExternalMarketService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  private readonly matchExternalEndpoint: Record<InternalMarketEndpoint, ExternalMarketEndpoint> = {
    [InternalMarketEndpoint.LIST_HOT]: ExternalMarketEndpoint.GET_WORLD_MARKET_HOT_LIST,
    [InternalMarketEndpoint.LIST]: ExternalMarketEndpoint.GET_WORLD_MARKET_LIST,
    [InternalMarketEndpoint.ITEM_TYPES]: ExternalMarketEndpoint.GET_WORLD_MARKET_SUB_LIST,
    [InternalMarketEndpoint.ITEM_DETAILS]: ExternalMarketEndpoint.GET_ITEM_SELL_BUY_INFO,
  };

  public buildExternalMarketRequest(
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

    const url: URL = this.getExternalMarketUrl(this.getExternalMarketEndpoint(endpoint), meta.region);

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

  public getExternalMarketAsset(endpoint: string, assetType: ExternalMarketAsset): Observable<AxiosResponse> {
    const config: AxiosRequestConfig = {};

    if (assetType === ExternalMarketAsset.IMAGE) {
      const url: URL = this.getExternalMarketCdnUrl(endpoint);
      config.responseType = 'stream';

      return this.httpService.get(url.href, config);
    }

    throw new ExternalMarketException(`Could not fetch asset ${endpoint} from external CDN`);
  }

  private getExternalMarketUrl(endpoint: string, region: string): URL {
    return new URL(`https://${region}-trade.naeu.playblackdesert.com/Home/${endpoint}`);
  }

  private getExternalMarketCdnUrl(endpoint: string): URL {
    return new URL(`https://s1.pearlcdn.com/NAEU/TradeMarket/Common/${endpoint}`);
  }

  private getExternalMarketEndpoint(endpoint: string): string {
    if (!this.matchExternalEndpoint[endpoint]) {
      throw new ExternalMarketException(`Could not match endpoint ${endpoint} with any external endpoint`);
    }

    return this.matchExternalEndpoint[endpoint];
  }
}
