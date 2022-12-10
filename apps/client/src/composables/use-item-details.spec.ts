import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetails } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useItemDetails } from '@/composables/use-item-details';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_USE_ITEM_DETAILS_ID: number = 5600;
const MOCK_USE_ITEM_DETAILS_ENHANCEMENT: number = 0;
const MOCK_USE_ITEM_DETAILS_ITEM_DETAILS: BlackDesertItemDetails = mockBlackDesertItemDetails();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useItemDetails', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemDetails(MOCK_USE_ITEM_DETAILS_ID, MOCK_USE_ITEM_DETAILS_ENHANCEMENT);
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
      execute: () => mockMarketApiResponse<BlackDesertItemDetails>(MOCK_USE_ITEM_DETAILS_ITEM_DETAILS),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemDetails = await componentVM.fetch();

    expect(response).toEqual(MOCK_USE_ITEM_DETAILS_ITEM_DETAILS);
  });
});
