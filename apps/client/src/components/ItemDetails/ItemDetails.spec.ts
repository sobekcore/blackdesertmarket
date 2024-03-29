import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetails, mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import ItemDetails from '@/components/ItemDetails/ItemDetails.vue';
import ItemDetailsAdditional from '@/components/ItemDetails/ItemDetailsAdditional.vue';
import ItemDetailsAvailability from '@/components/ItemDetails/ItemDetailsAvailability.vue';
import ItemDetailsOverview from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverview.vue';

const MOCK_ID: number = 5600;
const MOCK_ENHANCEMENT: number = 0;
const MOCK_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();
const MOCK_ITEM_DETAILS: BlackDesertItemDetails = mockBlackDesertItemDetails();

jest.mock('@/composables/item-type/use-item-type-fetch', () => ({
  useItemTypeFetch: () => ({
    fetchByEnhancement: () => Promise.resolve(MOCK_ITEM_TYPE),
  }),
}));

jest.mock('@/composables/item-details/use-item-details-fetch', () => ({
  useItemDetailsFetch: () => ({
    fetch: () => Promise.resolve(MOCK_ITEM_DETAILS),
  }),
}));

describe('ItemDetails', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetails, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
      props: {
        id: MOCK_ID,
        enhancement: MOCK_ENHANCEMENT,
      },
    });
  });

  it('should render ItemDetailsOverview component', () => {
    const itemDetailsOverviewWrapper: VueWrapper = wrapper.findComponent(ItemDetailsOverview);

    expect(itemDetailsOverviewWrapper.exists()).toBeTruthy();
  });

  it('should render ItemDetailsAdditional component', () => {
    const itemDetailsAdditionalWrapper: VueWrapper = wrapper.findComponent(ItemDetailsAdditional);

    expect(itemDetailsAdditionalWrapper.exists()).toBeTruthy();
  });

  it('should render ItemDetailsAvailability component', () => {
    const itemDetailsAvailabilityWrapper: VueWrapper = wrapper.findComponent(ItemDetailsAvailability);

    expect(itemDetailsAvailabilityWrapper.exists()).toBeTruthy();
  });

  it('should pass itemType prop to ItemDetailsOverview depending on id prop', async () => {
    wrapper = shallowMount(ItemDetails, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
      props: {
        id: MOCK_ID,
        enhancement: MOCK_ENHANCEMENT,
      },
    });

    await flushPromises();

    const itemDetailsOverviewWrapper: VueWrapper = wrapper.findComponent(ItemDetailsOverview);
    const itemDetailsOverviewVM: Record<string, any> = itemDetailsOverviewWrapper.vm as Record<string, any>;

    expect(itemDetailsOverviewVM).toHaveProperty('itemType');
    expect(itemDetailsOverviewVM.itemType).toEqual(MOCK_ITEM_TYPE);
  });

  it('should pass itemDetails prop to ItemDetailsOverview depending on id and enhancement props', async () => {
    wrapper = shallowMount(ItemDetails, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
      props: {
        id: MOCK_ID,
        enhancement: MOCK_ENHANCEMENT,
      },
    });

    await flushPromises();

    const itemDetailsOverviewWrapper: VueWrapper = wrapper.findComponent(ItemDetailsOverview);
    const itemDetailsOverviewVM: Record<string, any> = itemDetailsOverviewWrapper.vm as Record<string, any>;

    expect(itemDetailsOverviewVM).toHaveProperty('itemDetails');
    expect(itemDetailsOverviewVM.itemDetails).toEqual(MOCK_ITEM_DETAILS);
  });
});
