import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItem, BlackDesertItemHot, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import {
  isValidBlackDesertItem,
  isValidBlackDesertItemHot,
  isValidBlackDesertItemQueue,
} from '@blackdesertmarket/objects';
import { AxiosResponse } from 'axios';
import { I18nService } from 'nestjs-i18n';
import { Observable, of } from 'rxjs';
import { mockAxiosResponse } from '@test/mocks/axios-response.mock';
import { CoreModuleMock } from '@test/mocks/core-module.mock';
import { mockExternalMarketItemHot, mockExternalMarketItemQueue } from '@test/mocks/external-market-item-type.mock';
import { mockExternalMarketItem } from '@test/mocks/external-market-item.mock';
import { mockI18nContext } from '@test/mocks/i18n-context.mock';
import { mockRegionContext } from '@test/mocks/region-context.mock';
import { ControllerResponse } from '@/interfaces/objects/controller-response.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';

describe('ListController', () => {
  let listController: ListController;
  let httpService: HttpService;
  let i18nService: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModuleMock, ExternalMarketModule, BdoCodexModule],
      controllers: [ListController],
      providers: [ListService, ItemValidatorService, ItemTransformerService],
    }).compile();

    listController = module.get<ListController>(ListController);
    httpService = module.get<HttpService>(HttpService);
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('findHotItems', () => {
    it('should return BlackDesertItemHot on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ hotList: [mockExternalMarketItemHot()] }));
      });

      const response: ControllerResponse<BlackDesertItemHot[]> = await listController.findHotItems(
        mockRegionContext(),
        mockI18nContext(i18nService),
      );

      const validItemHot: boolean = isValidBlackDesertItemHot(getFirstElement<BlackDesertItemHot>(response.data));

      expect(validItemHot).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const promise: Promise<ControllerResponse<unknown>> = listController.findHotItems(
        mockRegionContext(),
        mockI18nContext(i18nService),
      );

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findQueueItems', () => {
    it('should return BlackDesertItemQueue on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ _waitList: [mockExternalMarketItemQueue()] }));
      });

      const response: ControllerResponse<BlackDesertItemQueue[]> = await listController.findQueueItems(
        mockRegionContext(),
        mockI18nContext(i18nService),
      );

      const validItemQueue: boolean = isValidBlackDesertItemQueue(getFirstElement<BlackDesertItemQueue>(response.data));

      expect(validItemQueue).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const promise: Promise<ControllerResponse<unknown>> = listController.findQueueItems(
        mockRegionContext(),
        mockI18nContext(i18nService),
      );

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findByCategory', () => {
    it('should return BlackDesertItem', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ marketList: [mockExternalMarketItem()] }));
      });

      const response: ControllerResponse<BlackDesertItem[]> = await listController.findByCategory(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { mainCategory: 25, subCategory: 2 },
      );

      const validItemQueue: boolean = isValidBlackDesertItem(getFirstElement<BlackDesertItem>(response.data));

      expect(validItemQueue).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const promise: Promise<ControllerResponse<unknown>> = listController.findByCategory(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { mainCategory: 25, subCategory: 2 },
      );

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });
});
