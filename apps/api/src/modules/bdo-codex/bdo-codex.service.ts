import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { BdoCodexMeta, BdoCodexParams } from '@/interfaces/objects/bdo-codex.interface';
import { BdoCodexEndpoint, BdoCodexLanguageCode } from '@/enums/bdo-codex.enum';
import { LanguageCode } from '@/enums/language.enum';

@Injectable()
export class BdoCodexService {
  constructor(private readonly httpService: HttpService) {}

  public readonly matchBdoCodexLanguage: Record<LanguageCode, BdoCodexLanguageCode> = {
    [LanguageCode.ENGLISH]: BdoCodexLanguageCode.ENGLISH,
    [LanguageCode.SPANISH]: BdoCodexLanguageCode.SPANISH,
  };

  public buildRequest(
    endpoint: BdoCodexEndpoint,
    params: BdoCodexParams,
    meta: BdoCodexMeta,
  ): Observable<AxiosResponse> {
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
