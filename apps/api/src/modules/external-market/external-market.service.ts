import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ExternalMarketMeta, ExternalMarketParams } from '@/interfaces/objects/external-market.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { ExternalMarketEndpoint, ExternalMarketLanguageCode } from '@/enums/external-market.enum';
import { HttpHeader } from '@/enums/http.enum';
import { LanguageCode } from '@/enums/language.enum';

@Injectable()
export class ExternalMarketService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  /**
   * TODO: Match all the available languages in external market
   */
  private readonly matchExternalMarketLanguage: Record<LanguageCode, ExternalMarketLanguageCode> = {
    [LanguageCode.ENGLISH]: ExternalMarketLanguageCode.ENGLISH,
    [LanguageCode.SPANISH]: ExternalMarketLanguageCode.SPANISH,
  };

  public buildRequest(
    endpoint: ExternalMarketEndpoint,
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

    const language: ExternalMarketLanguageCode = this.matchExternalMarketLanguage[meta.language];

    const url: URL = this.getRequestUrl(endpoint, meta.region);
    const data: URLSearchParams = new URLSearchParams();
    data.append('__RequestVerificationToken', paramsRequestToken);

    for (const [key, value] of Object.entries(params)) {
      data.append(key, value);
    }

    const config: AxiosRequestConfig = {
      headers: {
        [HttpHeader.COOKIE]: `__RequestVerificationToken=${cookieRequestToken}; lang=${language};`,
        [HttpHeader.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
        [HttpHeader.USER_AGENT]: 'BlackDesert',
      },
    };

    return this.httpService.post(url.href, data, config);
  }

  private getRequestUrl(endpoint: ExternalMarketEndpoint, region: string): URL {
    return new URL(`https://${region}-trade.naeu.playblackdesert.com/Home/${endpoint}`);
  }
}
