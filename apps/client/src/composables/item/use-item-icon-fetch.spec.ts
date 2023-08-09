import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockCustomMarketApiResponse } from '@test/mocks/market-api-response.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockCreateObjectURL } from '@test/mocks/url.mock';
import { useItemIconFetch } from '@/composables/item/use-item-icon-fetch';
import { useMarketApi } from '@/composables/use-market-api';

const mockUseMarketApi: jest.Mock = useMarketApi as jest.Mock;

const MOCK_ID: number = 5600;
const MOCK_BLOB: string = 'mock-blob';
mockCreateObjectURL(MOCK_BLOB);

jest.mock('@/composables/use-market-api', () => ({
  useMarketApi: jest.fn(),
}));

describe('useItemIconFetch', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemIconFetch(MOCK_ID);
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
      execute: () => mockCustomMarketApiResponse<Blob>(new Blob()),
    }));

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const response: BlackDesertItemDetails = await componentVM.fetch();

    expect(response).toContain(MOCK_BLOB);
  });
});
