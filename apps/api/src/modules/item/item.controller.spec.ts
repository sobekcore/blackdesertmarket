import { createReadStream } from 'fs';
import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItemDetails, isValidBlackDesertItemType } from '@blackdesertmarket/objects';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ExternalMarketException } from '@/exceptions/external-market.exception';
import { mockAxiosResponse } from '@/mocks/axios-response.mock';
import { mockExternalMarketItemType } from '@/mocks/external-market-item-type.mock';
import { mockExternalMarketItemDetails } from '@/mocks/external-market-item-details.mock';
import { CoreModule } from '@/core.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemController } from '@/modules/item/item.controller';
import { ItemService } from '@/modules/item/item.service';
import { FindTypesByIdParamsDto, FindTypesByIdQueryDto } from '@/modules/item/dto/find-types-by-id.dto';
import { FindIconByIdParamsDto } from '@/modules/item/dto/find-icon-by-id.dto';
import { FindDetailsByIdParamsDto, FindDetailsByIdQueryDto } from '@/modules/item/dto/find-details-by-id.dto';

describe('ItemController', () => {
  let itemController: ItemController;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, ExternalMarketModule],
      controllers: [ItemController],
      providers: [ItemService],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('findTypesById', () => {
    it('should return BlackDesertItemType on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ detailList: [mockExternalMarketItemType()] }));
      });

      const params: FindTypesByIdParamsDto = { id: 5600 };
      const query: FindTypesByIdQueryDto = {};

      const response: ControllerResponse<BlackDesertItemType[]> = await itemController.findTypesById(params, query);
      const validItemType: boolean = isValidBlackDesertItemType(getFirstElement<BlackDesertItemType>(response.data));

      expect(validItemType).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const params: FindTypesByIdParamsDto = { id: 5600 };
      const query: FindTypesByIdQueryDto = {};

      const promise: Promise<ControllerResponse<unknown>> = itemController.findTypesById(params, query);

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findIconById', () => {
    it('should return StreamableFile with type image/png on valid response', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse(createReadStream('src/mocks/external-market-item-icon.mock.png')));
      });

      const params: FindIconByIdParamsDto = { id: 5600 };

      const response: StreamableFile = await itemController.findIconById(params);
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

      const params: FindIconByIdParamsDto = { id: 5600 };

      const promise: Promise<unknown> = itemController.findIconById(params);

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });

  describe('findDetailsById', () => {
    it('should return BlackDesertItemDetails on valid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse(mockExternalMarketItemDetails()));
      });

      const params: FindDetailsByIdParamsDto = { id: 5600, enhancement: 0 };
      const query: FindDetailsByIdQueryDto = {};

      const response: ControllerResponse<BlackDesertItemDetails> = await itemController.findDetailsById(params, query);
      const validItemDetails: boolean = isValidBlackDesertItemDetails(response.data);

      expect(validItemDetails).toBeTruthy();
    });

    it('should throw ExternalMarketException on invalid response', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({}));
      });

      const params: FindDetailsByIdParamsDto = { id: 5600, enhancement: 0 };
      const query: FindDetailsByIdQueryDto = {};

      const promise: Promise<ControllerResponse<unknown>> = itemController.findDetailsById(params, query);

      expect(promise).rejects.toThrow(ExternalMarketException);
    });
  });
});
