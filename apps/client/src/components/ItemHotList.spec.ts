import { ComponentInternalInstance } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemHot } from '@blackdesertmarket/mocks';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockListFilterData } from '@test/mocks/list-filter.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { ListFilterData } from '@/interfaces/list-filter';
import { UseListFilterReturn } from '@/composables/list-filter/use-list-filter';
import ItemHotList from '@/components/ItemHotList.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';

const MOCK_ITEM_HOT: BlackDesertItemHot = mockBlackDesertItemHot();
const MOCK_FILTER_DATA: ListFilterData = mockListFilterData();
const MOCK_PROCESS_ITEM_LIST: jest.Mock<UseListFilterReturn['processItemList']> = jest.fn();

jest.mock('@/composables/item-hot/use-item-hot-fetch', () => ({
  useItemHotFetch: () => ({
    fetch: () => Promise.resolve([MOCK_ITEM_HOT]),
  }),
}));

jest.mock('@/composables/list-filter/use-list-filter', () => ({
  useListFilter: () => ({
    processItemList: MOCK_PROCESS_ITEM_LIST,
  }),
}));

describe('ItemHotList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemHotList, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
    });
  });

  it('should render RecycleScroller component', () => {
    const recycleScrollerWrapper: VueWrapper = wrapper.findComponent(RecycleScroller);

    expect(recycleScrollerWrapper.exists()).toBeTruthy();
  });

  it('should render ListFilter component', () => {
    const listFilterWrapper: VueWrapper = wrapper.findComponent(ListFilter);

    expect(listFilterWrapper.exists()).toBeTruthy();
  });

  it('should handle filter event from ListFilter', () => {
    const listFilterWrapper: VueWrapper = wrapper.findComponent(ListFilter);

    const component: ComponentInternalInstance = listFilterWrapper.getCurrentComponent();
    component.emit('filter', MOCK_FILTER_DATA);

    expect(MOCK_PROCESS_ITEM_LIST).toBeCalled();
  });
});
