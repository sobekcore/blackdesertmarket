import { ComponentInternalInstance } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockListFilterData } from '@test/mocks/list-filter.mock';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { ListFilterData } from '@/interfaces/list-filter';
import { UseListFilterReturn } from '@/composables/list-filter/use-list-filter';
import ItemTypeList from '@/components/ItemTypeList.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const MOCK_ID: number = 5600;
const MOCK_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();
const MOCK_FILTER_DATA: ListFilterData = mockListFilterData();
const MOCK_PROCESS_ITEM_LIST: jest.Mock<UseListFilterReturn['processItemList']> = jest.fn();

jest.mock('@/composables/item-type/use-item-type-fetch', () => ({
  useItemTypeFetch: () => ({
    fetch: () => Promise.resolve([MOCK_ITEM_TYPE]),
  }),
}));

jest.mock('@/composables/list-filter/use-list-filter', () => ({
  useListFilter: () => ({
    processItemList: MOCK_PROCESS_ITEM_LIST,
  }),
}));

describe('ItemTypeList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemTypeList, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
      props: {
        id: MOCK_ID,
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

    expect(MOCK_PROCESS_ITEM_LIST).toHaveBeenCalled();
  });

  it('should pass item prop to ListItem depending on id prop', async () => {
    wrapper = shallowMount(ItemTypeList, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
      props: {
        id: MOCK_ID,
      },
    });

    await flushPromises();

    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);
    const listItemVM: Record<string, any> = listItemWrapper.vm as Record<string, any>;

    expect(listItemVM).toHaveProperty('item');
    expect(listItemVM.item).toEqual(MOCK_ITEM_TYPE);
  });
});
