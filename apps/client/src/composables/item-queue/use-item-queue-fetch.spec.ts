import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemQueue } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useItemQueueFetch } from '@/composables/item-queue/use-item-queue-fetch';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_ITEM_QUEUE: BlackDesertItemQueue = mockBlackDesertItemQueue();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useItemQueueFetch', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemQueueFetch();
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
      execute: () => mockMarketApiResponse<BlackDesertItemQueue[]>([MOCK_ITEM_QUEUE]),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemQueue[] = await componentVM.fetch();

    expect(response).toEqual([MOCK_ITEM_QUEUE]);
  });
});
