import { ComponentInternalInstance } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import CategoryItemList from '@/components/CategoryItemList.vue';
import ListItem from '@/components/ListItem/ListItem.vue';

const MOCK_CATEGORY_ITEM_LIST_MAIN_CATEGORY: number = 25;
const MOCK_CATEGORY_ITEM_LIST_SUB_CATEGORY: number = 2;
const MOCK_CATEGORY_ITEM_LIST_ITEM: BlackDesertItem = mockBlackDesertItem();

jest.mock('@/composables/use-category-item-list', () => ({
  useCategoryItemList: () => ({
    fetch: () => Promise.resolve([MOCK_CATEGORY_ITEM_LIST_ITEM]),
  }),
}));

describe('CategoryItemList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategoryItemList, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        mainCategory: MOCK_CATEGORY_ITEM_LIST_MAIN_CATEGORY,
        subCategory: MOCK_CATEGORY_ITEM_LIST_SUB_CATEGORY,
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

  it('should pass item prop to ListItem depending of mainCategory and subCategory props', async () => {
    wrapper = shallowMount(CategoryItemList, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        mainCategory: MOCK_CATEGORY_ITEM_LIST_MAIN_CATEGORY,
        subCategory: MOCK_CATEGORY_ITEM_LIST_SUB_CATEGORY,
      },
    });

    await flushPromises();

    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);
    const listItemVM: Record<string, any> = listItemWrapper.vm as Record<string, any>;

    expect(listItemVM).toHaveProperty('item');
    expect(listItemVM.item).toEqual(MOCK_CATEGORY_ITEM_LIST_ITEM);
  });
});
