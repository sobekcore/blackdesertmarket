import { ComponentInternalInstance } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockListFilterData } from '@test/mocks/list-filter.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { ListFilterData } from '@/interfaces/list-filter';
import { UseListFilterReturn } from '@/composables/list-filter/use-list-filter';
import ItemList from '@/components/ItemList.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const MOCK_MAIN_CATEGORY: number = 25;
const MOCK_SUB_CATEGORY: number = 2;
const MOCK_ITEM: BlackDesertItem = mockBlackDesertItem();
const MOCK_FILTER_DATA: ListFilterData = mockListFilterData();
const MOCK_PROCESS_ITEM_LIST: jest.Mock<UseListFilterReturn['processItemList']> = jest.fn();

jest.mock('@/composables/item/use-item-fetch', () => ({
  useItemFetch: () => ({
    fetch: () => Promise.resolve([MOCK_ITEM]),
  }),
}));

jest.mock('@/composables/list-filter/use-list-filter', () => ({
  useListFilter: () => ({
    processItemList: MOCK_PROCESS_ITEM_LIST,
  }),
}));

describe('ItemList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemList, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        mainCategory: MOCK_MAIN_CATEGORY,
        subCategory: MOCK_SUB_CATEGORY,
      },
    });
  });

  it('should render ListItem component', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    expect(listItemWrapper.exists()).toBeTruthy();
  });

  it('should render ListFilter component', () => {
    const listFilterWrapper: VueWrapper = wrapper.findComponent(ListFilter);

    expect(listFilterWrapper.exists()).toBeTruthy();
  });

  it('should handle effect event from ListItem', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = listItemWrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should handle filter event from ListFilter', () => {
    const listFilterWrapper: VueWrapper = wrapper.findComponent(ListFilter);

    const component: ComponentInternalInstance = listFilterWrapper.getCurrentComponent();
    component.emit('filter', MOCK_FILTER_DATA);

    expect(MOCK_PROCESS_ITEM_LIST).toBeCalled();
  });

  it('should pass item prop to ListItem depending of mainCategory and subCategory props', async () => {
    wrapper = shallowMount(ItemList, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        mainCategory: MOCK_MAIN_CATEGORY,
        subCategory: MOCK_SUB_CATEGORY,
      },
    });

    await flushPromises();

    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);
    const listItemVM: Record<string, any> = listItemWrapper.vm as Record<string, any>;

    expect(listItemVM).toHaveProperty('item');
    expect(listItemVM.item).toEqual(MOCK_ITEM);
  });
});
