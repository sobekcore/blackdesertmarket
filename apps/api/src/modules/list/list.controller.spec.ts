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
import { Observable, of } from 'rxjs';
import { mockAxiosResponse } from '@test/mocks/axios-response.mock';
import { mockExternalMarketItemHot, mockExternalMarketItemQueue } from '@test/mocks/external-market-item-type.mock';
import { mockExternalMarketItem } from '@test/mocks/external-market-item.mock';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { FindByCategoryParamsDto, FindByCategoryQueryDto } from '@/modules/list/dto/find-by-category.dto';
import { FindHotItemsQueryDto } from '@/modules/list/dto/find-hot-items.dto';
import { FindQueueItemsQueryDto } from '@/modules/list/dto/find-queue-items.dto';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';
import { CoreModule } from '@/core.module';

describe('ListController', () => {
  let listController: ListController;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, ExternalMarketModule, BdoCodexModule],
      controllers: [ListController],
      providers: [ListService, ItemValidatorService, ItemTransformerService],
    }).compile();

    listController = module.get<ListController>(ListController);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('findHotItems', () => {
    it('should return BlackDesertItemHot on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ hotList: [mockExternalMarketItemHot()] }));
      });

      const query: FindHotItemsQueryDto = {};

      const response: ControllerResponse<BlackDesertItemHot[]> = await listController.findHotItems(query);
      const validItemHot: boolean = isValidBlackDesertItemHot(getFirstElement<BlackDesertItemHot>(response.data));

      expect(validItemHot).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const query: FindHotItemsQueryDto = {};

      const promise: Promise<ControllerResponse<unknown>> = listController.findHotItems(query);

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findQueueItems', () => {
    it('should return BlackDesertItemQueue on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ _waitList: [mockExternalMarketItemQueue()] }));
      });

      const query: FindQueueItemsQueryDto = {};

      const response: ControllerResponse<BlackDesertItemQueue[]> = await listController.findQueueItems(query);
      const validItemQueue: boolean = isValidBlackDesertItemQueue(getFirstElement<BlackDesertItemQueue>(response.data));

      expect(validItemQueue).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const query: FindQueueItemsQueryDto = {};

      const promise: Promise<ControllerResponse<unknown>> = listController.findQueueItems(query);

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findByCategory', () => {
    it('should return BlackDesertItem', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ marketList: [mockExternalMarketItem()] }));
      });

      const params: FindByCategoryParamsDto = { mainCategory: 25, subCategory: 2 };
      const query: FindByCategoryQueryDto = {};

      const response: ControllerResponse<BlackDesertItem[]> = await listController.findByCategory(params, query);
      const validItemQueue: boolean = isValidBlackDesertItem(getFirstElement<BlackDesertItem>(response.data));

      expect(validItemQueue).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const params: FindByCategoryParamsDto = { mainCategory: 25, subCategory: 2 };
      const query: FindByCategoryQueryDto = {};

      const promise: Promise<ControllerResponse<unknown>> = listController.findByCategory(params, query);

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });
});
