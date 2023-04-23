import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetails } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { useItemDetailsFetch } from '@/composables/item-details/use-item-details-fetch';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_ID: number = 5600;
const MOCK_ENHANCEMENT: number = 0;
const MOCK_ITEM_DETAILS: BlackDesertItemDetails = mockBlackDesertItemDetails();

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useItemDetailsFetch', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemDetailsFetch(MOCK_ID, MOCK_ENHANCEMENT);
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
      execute: () => mockMarketApiResponse<BlackDesertItemDetails>(MOCK_ITEM_DETAILS),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemDetails = await componentVM.fetch();

    expect(response).toEqual(MOCK_ITEM_DETAILS);
  });
});
