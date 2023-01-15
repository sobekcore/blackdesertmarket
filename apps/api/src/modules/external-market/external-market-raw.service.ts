import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/objects/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ExternalMarketRawEndpoint } from '@/enums/external-market-raw.enum';
import { HttpHeader } from '@/enums/http.enum';

@Injectable()
export class ExternalMarketRawService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  public buildRequest(
    endpoint: ExternalMarketRawEndpoint,
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
