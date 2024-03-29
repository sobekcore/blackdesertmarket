import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useItemTypeFetch } from '@/composables/item-type/use-item-type-fetch';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_ID: number = 5600;
const MOCK_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useItemTypeFetch', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemTypeFetch(MOCK_ID);
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
      execute: () => mockMarketApiResponse<BlackDesertItemType[]>([MOCK_ITEM_TYPE]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemType[] = await componentVM.fetch();

    expect(response).toEqual([MOCK_ITEM_TYPE]);
  });

  it('should return proper data from fetchBaseType', async () => {
    mockUseMarketApi.mockImplementationOnce(() => ({
      execute: () => mockMarketApiResponse<BlackDesertItemType[]>([MOCK_ITEM_TYPE]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemType = await componentVM.fetchBaseType();

    expect(response).toEqual(MOCK_ITEM_TYPE);
  });
});
