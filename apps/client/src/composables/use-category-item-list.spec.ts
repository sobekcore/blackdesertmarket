import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useCategoryItemList } from '@/composables/use-category-item-list';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_USE_CATEGORY_ITEM_LIST_MAIN_CATEGORY: number = 25;
const MOCK_USE_CATEGORY_ITEM_LIST_SUB_CATEGORY: number = 2;
const MOCK_USE_CATEGORY_ITEM_LIST_ITEM: BlackDesertItem = mockBlackDesertItem();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useCategoryItemList', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useCategoryItemList(MOCK_USE_CATEGORY_ITEM_LIST_MAIN_CATEGORY, MOCK_USE_CATEGORY_ITEM_LIST_SUB_CATEGORY);
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
      execute: () => mockMarketApiResponse<BlackDesertItem[]>([MOCK_USE_CATEGORY_ITEM_LIST_ITEM]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItem[] = await componentVM.fetch();

    expect(response).toEqual([MOCK_USE_CATEGORY_ITEM_LIST_ITEM]);
  });
});
