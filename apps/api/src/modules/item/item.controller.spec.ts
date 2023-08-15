import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItemDetails, isValidBlackDesertItemType } from '@blackdesertmarket/objects';
import { createReadStream } from 'fs';
import { I18nService } from 'nestjs-i18n';
import { Observable, of } from 'rxjs';
import { mockAxiosResponse } from '@test/mocks/axios-response.mock';
import { CoreModuleMock } from '@test/mocks/core-module.mock';
import { mockExternalMarketItemDetails } from '@test/mocks/external-market-item-details.mock';
import { mockExternalMarketItemType } from '@test/mocks/external-market-item-type.mock';
import { mockI18nContext } from '@test/mocks/i18n-context.mock';
import { mockRegionContext } from '@test/mocks/region-context.mock';
import { ControllerResponse } from '@/interfaces/objects/controller-response.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { ItemController } from '@/modules/item/item.controller';
import { ItemService } from '@/modules/item/item.service';

describe('ItemController', () => {
  let itemController: ItemController;
  let httpService: HttpService;
  let i18nService: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModuleMock, ExternalMarketModule, BdoCodexModule],
      controllers: [ItemController],
      providers: [ItemService, ItemValidatorService, ItemTransformerService],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    httpService = module.get<HttpService>(HttpService);
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('findTypesById', () => {
    it('should return BlackDesertItemType on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ detailList: [mockExternalMarketItemType()] }));
      });

      const response: ControllerResponse<BlackDesertItemType[]> = await itemController.findTypesById(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { id: 5600 },
      );

      const validItemType: boolean = isValidBlackDesertItemType(getFirstElement<BlackDesertItemType>(response.data));

      expect(validItemType).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const promise: Promise<ControllerResponse<unknown>> = itemController.findTypesById(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { id: 5600 },
      );

      await expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findIconById', () => {
    it('should return StreamableFile with type image/png on valid response', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse(createReadStream('test/mocks/external-market-item-icon.mock.png')));
      });

      const response: StreamableFile = await itemController.findIconById({ id: 5600 });
      const validItemIconStream = typeof response.getStream() !== 'undefined';
      const validItemIconType = response.getHeaders().type === 'image/png';

      expect(response).toBeInstanceOf(StreamableFile);
      expect(validItemIconStream).toBeTruthy();
      expect(validItemIconType).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const promise: Promise<unknown> = itemController.findIconById({ id: 5600 });

      await expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findDetailsById', () => {
    it('should return BlackDesertItemDetails on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse(mockExternalMarketItemDetails()));
      });

      const response: ControllerResponse<BlackDesertItemDetails> = await itemController.findDetailsById(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { id: 5600, enhancement: 0 },
        { extended: true },
      );

      const validItemDetails: boolean = isValidBlackDesertItemDetails(response.data);

      expect(validItemDetails).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const promise: Promise<ControllerResponse<unknown>> = itemController.findDetailsById(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { id: 5600, enhancement: 0 },
        { extended: true },
      );

      await expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });
});
