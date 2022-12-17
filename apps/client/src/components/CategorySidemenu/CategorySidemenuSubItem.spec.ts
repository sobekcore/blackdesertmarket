import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import CategorySidemenuSubItem from '@/components/CategorySidemenu/CategorySidemenuSubItem.vue';

const MOCK_CATEGORY_SIDEMENU_SUB_ITEM_TITLE: string = 'Category Sidemenu Sub-Item Title';
const MOCK_CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY: number = 1;
const MOCK_CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY: number = 1;

jest.mock('@/stores/location', () => ({
  useLocationStore: () => ({
    getMainCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
    getSubCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
  }),
}));

describe('CategorySidemenuSubItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategorySidemenuSubItem, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        title: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_TITLE,
        mainCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
        subCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(CategorySidemenuSubItem, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        title: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_TITLE,
        mainCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
        subCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
      },
    });

    expect(wrapper.text()).toBe(MOCK_CATEGORY_SIDEMENU_SUB_ITEM_TITLE);
  });

  it('should emit effect event on click', () => {
    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');
    button.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should contain class depending on router location', () => {
    wrapper = shallowMount(CategorySidemenuSubItem, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        title: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_TITLE,
        mainCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
        subCategory: MOCK_CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
      },
    });

    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');

    expect(button.classes()).toContain('button-active-state');
  });
});
