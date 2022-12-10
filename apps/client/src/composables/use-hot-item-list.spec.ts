import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemHot } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useHotItemList } from '@/composables/use-hot-item-list';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_USE_HOT_ITEM_LIST_ITEM_HOT: BlackDesertItemHot = mockBlackDesertItemHot();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useHotItemList', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useHotItemList();
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
      execute: () => mockMarketApiResponse<BlackDesertItemHot[]>([MOCK_USE_HOT_ITEM_LIST_ITEM_HOT]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemHot[] = await componentVM.fetch();

    expect(response).toEqual([MOCK_USE_HOT_ITEM_LIST_ITEM_HOT]);
  });
});
