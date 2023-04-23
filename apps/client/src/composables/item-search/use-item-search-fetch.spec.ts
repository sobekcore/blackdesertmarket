import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useItemSearchFetch } from '@/composables/item-search/use-item-search-fetch';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_SEARCH: string = 'Mock Search';
const MOCK_ITEM: BlackDesertItem = mockBlackDesertItem();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useItemSearchFetch', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemSearchFetch(MOCK_SEARCH);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component, {
      global: {
        plugins: mockPlugins(),
      },
    });
  });

  it('should return proper data from fetch', async () => {
    mockUseMarketApi.mockImplementationOnce(() => ({
      execute: () => mockMarketApiResponse<BlackDesertItem[]>([MOCK_ITEM]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItem[] = await componentVM.fetch();

    expect(response).toEqual([MOCK_ITEM]);
  });
});
