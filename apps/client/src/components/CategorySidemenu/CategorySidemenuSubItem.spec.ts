import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import CategorySidemenuSubItem from '@/components/CategorySidemenu/CategorySidemenuSubItem.vue';

const CATEGORY_SIDEMENU_SUB_ITEM_TITLE: string = 'Category Sidemenu Sub-Item Title';
const CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY: number = 1;
const CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY: number = 1;

jest.mock('@/stores/location', () => ({
  useLocationStore: () => ({
    getMainCategory: CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
    getSubCategory: CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
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
        title: CATEGORY_SIDEMENU_SUB_ITEM_TITLE,
        mainCategory: CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
        subCategory: CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(CategorySidemenuSubItem, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        title: CATEGORY_SIDEMENU_SUB_ITEM_TITLE,
        mainCategory: CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
        subCategory: CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
      },
    });

    expect(wrapper.text()).toBe(CATEGORY_SIDEMENU_SUB_ITEM_TITLE);
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
        title: CATEGORY_SIDEMENU_SUB_ITEM_TITLE,
        mainCategory: CATEGORY_SIDEMENU_SUB_ITEM_MAIN_CATEGORY,
        subCategory: CATEGORY_SIDEMENU_SUB_ITEM_SUB_CATEGORY,
      },
    });

    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');

    expect(button.classes()).toContain('border-lighten');
    expect(button.classes()).toContain('button-active-state');
  });
});
