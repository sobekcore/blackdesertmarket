import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/axios/node_modules/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { isValidBlackDesertItem } from '@blackdesertmarket/objects';
import { I18nService } from 'nestjs-i18n';
import { Observable, of } from 'rxjs';
import { mockAxiosResponse } from '@test/mocks/axios-response.mock';
import { CoreModuleMock } from '@test/mocks/core-module.mock';
import { mockExternalMarketItemSearch } from '@test/mocks/external-market-item-search.mock';
import { mockI18nContext } from '@test/mocks/i18n-context.mock';
import { mockRegionContext } from '@test/mocks/region-context.mock';
import { ControllerResponse } from '@/interfaces/objects/controller-response.interface';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { SearchController } from '@/modules/search/search.controller';
import { SearchService } from '@/modules/search/search.service';

describe('SearchController', () => {
  let searchController: SearchController;
  let httpService: HttpService;
  let i18nService: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModuleMock, ExternalMarketModule, BdoCodexModule],
      controllers: [SearchController],
      providers: [SearchService, ItemValidatorService, ItemTransformerService],
    }).compile();

    searchController = module.get<SearchController>(SearchController);
    httpService = module.get<HttpService>(HttpService);
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('findBySearch', () => {
    it('should return BlackDesertItem on valid response with matching parameters', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ list: [mockExternalMarketItemSearch()] }));
      });

      const response: ControllerResponse<BlackDesertItem[]> = await searchController.findBySearch(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { search: 'Weeds' },
      );

      const validItem: boolean = isValidBlackDesertItem(getFirstElement<BlackDesertItem>(response.data));

      expect(validItem).toBeTruthy();
    });

    it('should return no data on valid response with non-matching parameters', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce((): Observable<AxiosResponse> => {
        return of(mockAxiosResponse({ list: [] }));
      });

      const response: ControllerResponse<BlackDesertItem[]> = await searchController.findBySearch(
        mockRegionContext(),
        mockI18nContext(i18nService),
        { search: 'Mock Search' },
      );

      expect(response.data).toEqual([]);
    });
  });
});
