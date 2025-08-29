import { AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsExtended,
  BlackDesertItemTooltip,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { ReadStream, createReadStream, createWriteStream, existsSync } from 'fs';
import { I18nContext } from 'nestjs-i18n';
import { Observable, lastValueFrom, map } from 'rxjs';
import { BdoCodexMeta, BdoCodexParams } from '@/interfaces/objects/bdo-codex.interface';
import { BlackDesertItemDetailsExtendedOnly } from '@/interfaces/objects/black-desert-item-details.interface';
import { ExternalMarketRawItemDetails } from '@/interfaces/objects/external-market-raw.interface';
import {
  ExternalMarketItemDetails,
  ExternalMarketItemType,
  ExternalMarketMeta,
  ExternalMarketParams,
} from '@/interfaces/objects/external-market.interface';
import { BdoCodexException } from '@/exceptions/bdo-codex.exception';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { BdoCodexEndpoint } from '@/enums/bdo-codex.enum';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ExternalMarketAsset } from '@/enums/external-market-asset.enum';
import { ExternalMarketRawEndpoint } from '@/enums/external-market-raw.enum';
import { ExternalMarketEndpoint, ExternalMarketRequestPath } from '@/enums/external-market.enum';
import { RegionContext } from '@/contexts/region.context';
import { BdoCodexService } from '@/modules/bdo-codex/bdo-codex.service';
import { ExternalMarketAssetService } from '@/modules/external-market/external-market-asset.service';
import { ExternalMarketRawService } from '@/modules/external-market/external-market-raw.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly configService: ConfigService,
    private readonly itemValidatorService: ItemValidatorService,
    private readonly itemTransformerService: ItemTransformerService,
    private readonly externalMarketService: ExternalMarketService,
    private readonly externalMarketRawService: ExternalMarketRawService,
    private readonly externalMarketAssetService: ExternalMarketAssetService,
    private readonly bdoCodexService: BdoCodexService,
  ) {}

  public findTypesById(region: RegionContext, i18n: I18nContext, id: number): Promise<BlackDesertItemType[]> {
    const params: ExternalMarketParams = {
      mainKey: String(id),
    };

    const meta: ExternalMarketMeta = {
      region: region.code,
      language: i18n.lang,
    };

    const data: Observable<BlackDesertItemType[]> = this.externalMarketService
      .buildRequest(ExternalMarketEndpoint.ITEM, params, meta)
      .pipe(
        map((response: AxiosResponse): unknown[] => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data.detailList ? response.data.detailList : [];
        }),
        map((data: unknown[]): BlackDesertItemType[] => {
          if (!data.length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          data.forEach((itemType: unknown): void => {
            if (!this.itemValidatorService.isValidExternalMarketItemType(itemType)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }
          });

          return data.map((itemType: ExternalMarketItemType): BlackDesertItemType => {
            return this.itemTransformerService.transformExternalMarketItemType(itemType);
          });
        }),
      );

    return lastValueFrom(data);
  }

  public findIconById(id: number): Promise<ReadStream> {
    const useCache: boolean = this.configService.get('useCache');

    const pathToAsset: string = `cache/images/item/${id}.png`;

    if (useCache && existsSync(pathToAsset)) {
      return new Promise<ReadStream>((resolve): void => {
        resolve(createReadStream(pathToAsset));
      });
    }

    const data: Observable<ReadStream> = this.externalMarketAssetService
      .buildRequest(`img/BDO/item/${id}.png`, ExternalMarketAsset.IMAGE)
      .pipe(
        map((response: AxiosResponse): ReadStream => {
          if (!Object.keys(response.data).length) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          if (useCache) {
            response.data.pipe(createWriteStream(pathToAsset));
          }

          return response.data;
        }),
      );

    return lastValueFrom(data);
  }

  public async findDetailsById(
    region: RegionContext,
    i18n: I18nContext,
    id: number,
    enhancement: number,
    extended?: boolean,
  ): Promise<BlackDesertItemDetails | BlackDesertItemDetailsExtended> {
    const params: ExternalMarketParams = {
      mainKey: String(id),
      subKey: String(enhancement),
      keyType: String(0),
      isUp: String(true),
    };

    const meta: ExternalMarketMeta = {
      region: region.code,
      language: i18n.lang,
    };

    let data: BlackDesertItemDetails | BlackDesertItemDetailsExtended = await lastValueFrom(
      this.externalMarketService.buildRequest(ExternalMarketEndpoint.ITEM_DETAILS, params, meta).pipe(
        map((response: AxiosResponse): unknown => {
          if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
            throw new ServiceUnavailableException({
              code: ControllerResponseCode.MAINTENANCE,
              messages: ['Currently external market is in the maintenance'],
            });
          }

          return response.data ? response.data : {};
        }),
        map((data: unknown): BlackDesertItemDetails => {
          if (!this.itemValidatorService.isValidExternalMarketItemDetails(data)) {
            throw new ExternalMarketException('Response from external market did contain invalid data');
          }

          return this.itemTransformerService.transformExternalMarketItemDetails(data as ExternalMarketItemDetails);
        }),
      ),
    );

    if (extended) {
      const additional: BlackDesertItemDetailsExtendedOnly = await lastValueFrom(
        this.externalMarketRawService.buildRequest(ExternalMarketRawEndpoint.ITEM_DETAILS, params, meta).pipe(
          map((response: AxiosResponse): unknown => {
            if (response.request.path === ExternalMarketRequestPath.MAINTENANCE) {
              throw new ServiceUnavailableException({
                code: ControllerResponseCode.MAINTENANCE,
                messages: ['Currently external market is in the maintenance'],
              });
            }

            return response.data ? response.data : '';
          }),
          map((additional: unknown): BlackDesertItemDetailsExtendedOnly => {
            if (!this.itemValidatorService.isValidExternalMarketRawItemDetails(additional)) {
              throw new ExternalMarketException('Response from external market did contain invalid data');
            }

            return this.itemTransformerService.transformExternalMarketRawItemDetails(
              additional as ExternalMarketRawItemDetails,
              enhancement,
            );
          }),
        ),
      );

      data = {
        ...data,
        ...additional,
      };
    }

    return data;
  }

  public async findTooltipById(i18n: I18nContext, id: number, enhancement: number): Promise<BlackDesertItemTooltip> {
    const params: BdoCodexParams = {
      id: String(`item--${id}`),
      enchant: String(enhancement),
      nf: String('on'),
    };

    const meta: BdoCodexMeta = {
      language: i18n.lang,
    };

    return this.bdoCodexService
      .buildRequest(BdoCodexEndpoint.ITEM_TOOLTIP, params, meta)
      .then((itemTooltip: string): BlackDesertItemTooltip => {
        try {
          return this.itemTransformerService.transformBdoCodexItemTooltip(i18n, itemTooltip, id, enhancement);
        } catch {
          throw new BdoCodexException('Response from BDO Codex did contain invalid data');
        }
      });
  }
}
