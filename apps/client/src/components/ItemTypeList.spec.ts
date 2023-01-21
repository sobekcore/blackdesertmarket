import { ComponentInternalInstance } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import ItemTypeList from '@/components/ItemTypeList.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const MOCK_ID: number = 5600;
const MOCK_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();

jest.mock('@/composables/item-type/use-item-type-fetch', () => ({
  useItemTypeFetch: () => ({
    fetch: () => Promise.resolve([MOCK_ITEM_TYPE]),
  }),
}));

describe('ItemTypeList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemTypeList, {
      global: {
        plugins: mockPlugins(),
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

  it('should handle effect event from ListItem', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = listItemWrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass item prop to ListItem depending on id prop', async () => {
    wrapper = shallowMount(ItemTypeList, {
      global: {
        plugins: mockPlugins(),
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
