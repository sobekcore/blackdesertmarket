import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExternalMarketAsset } from '@/enums/external-market-asset.enum';

@Injectable()
export class ExternalMarketAssetService {
  constructor(private readonly httpService: HttpService) {}

  public buildRequest(endpoint: string, assetType: ExternalMarketAsset): Observable<AxiosResponse> {
    const url: URL = this.getRequestUrl(endpoint);
    const config: AxiosRequestConfig = {};

    if (assetType === ExternalMarketAsset.IMAGE) {
      config.responseType = 'stream';
    }

    return this.httpService.get(url.href, config);
  }

  private getRequestUrl(endpoint: string): URL {
    return new URL(`https://s1.pearlcdn.com/NAEU/TradeMarket/Common/${endpoint}`);
  }
}
