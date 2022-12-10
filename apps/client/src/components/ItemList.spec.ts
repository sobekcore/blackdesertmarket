import { ComponentInternalInstance } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import ItemList from '@/components/ItemList.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const MOCK_ITEM_LIST_ID: number = 5600;
const MOCK_ITEM_LIST_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();

jest.mock('@/composables/use-item-list', () => ({
  useItemList: () => ({
    fetch: () => Promise.resolve([MOCK_ITEM_LIST_ITEM_TYPE]),
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
        id: MOCK_ITEM_LIST_ID,
      },
    });
  });

  it('should render ListItem component', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    expect(listItemWrapper.exists()).toBeTruthy();
  });

  it('should handle effect event from ListItem', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = listItemWrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass item prop to ListItem depending on id prop', async () => {
    wrapper = shallowMount(ItemList, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        id: MOCK_ITEM_LIST_ID,
      },
    });

    await flushPromises();

    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);
    const listItemVM: Record<string, any> = listItemWrapper.vm as Record<string, any>;

    expect(listItemVM).toHaveProperty('item');
    expect(listItemVM.item).toEqual(MOCK_ITEM_LIST_ITEM_TYPE);
  });
});
