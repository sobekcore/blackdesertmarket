import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemQueue } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useMarketApi } from '@/composables/use-market-api';
import { useQueueItemList } from '@/composables/use-queue-item-list';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_USE_QUEUE_ITEM_LIST_ITEM_QUEUE: BlackDesertItemQueue = mockBlackDesertItemQueue();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useQueueItemList', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useQueueItemList();
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
      execute: () => mockMarketApiResponse<BlackDesertItemQueue[]>([MOCK_USE_QUEUE_ITEM_LIST_ITEM_QUEUE]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemQueue[] = await componentVM.fetch();

    expect(response).toEqual([MOCK_USE_QUEUE_ITEM_LIST_ITEM_QUEUE]);
  });
});
