import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { BdoCodexMeta, BdoCodexParams } from '@/interfaces/bdo-codex.interface';
import { BdoCodexEndpoint, BdoCodexLanguageCode } from '@/enums/bdo-codex.enum';
import { LanguageCode } from '@/enums/language.enum';

@Injectable()
export class BdoCodexService {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  private readonly matchBdoCodexLanguage: Record<LanguageCode, BdoCodexLanguageCode> = {
    [LanguageCode.ENGLISH]: BdoCodexLanguageCode.ENGLISH,
    [LanguageCode.SPANISH]: BdoCodexLanguageCode.SPANISH,
  };

  public buildRequest(
    endpoint: BdoCodexEndpoint,
    params: BdoCodexParams,
    meta?: BdoCodexMeta,
  ): Observable<AxiosResponse> {
    if (!meta.language) {
      meta.language = this.configService.get('defaultRequestLanguage');
    }

    const language: BdoCodexLanguageCode = this.matchBdoCodexLanguage[meta.language];

    const url: URL = this.getRequestUrl(endpoint);

    const config: AxiosRequestConfig = {
      params: {
        ...params,
        l: language,
      },
    };

    return this.httpService.get(url.href, config);
  }

  private getRequestUrl(endpoint: string): URL {
    return new URL(`https://bdocodex.com/${endpoint}`);
  }
}
