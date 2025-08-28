import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import CategorySidemenuSubItem from '@/components/CategorySidemenu/CategorySidemenuSubItem.vue';

const MOCK_TITLE: string = 'Mock Title';
const MOCK_MAIN_CATEGORY: number = 1;
const MOCK_SUB_CATEGORY: number = 1;

jest.mock('@/stores/location', () => ({
  useLocationStore: () => ({
    mainCategory: MOCK_MAIN_CATEGORY,
    subCategory: MOCK_SUB_CATEGORY,
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
        title: MOCK_TITLE,
        mainCategory: MOCK_MAIN_CATEGORY,
        subCategory: MOCK_SUB_CATEGORY,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(CategorySidemenuSubItem, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        title: MOCK_TITLE,
        mainCategory: MOCK_MAIN_CATEGORY,
        subCategory: MOCK_SUB_CATEGORY,
      },
    });

    expect(wrapper.text()).toBe(MOCK_TITLE);
  });

  it('should emit effect event on click', () => {
    const categorySidemenuSubItem: DOMWrapper<HTMLElement> = wrapper.find('[data-test="category-sidemenu-sub-item"]');
    categorySidemenuSubItem.trigger('click');

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
        title: MOCK_TITLE,
        mainCategory: MOCK_MAIN_CATEGORY,
        subCategory: MOCK_SUB_CATEGORY,
      },
    });

    const categorySidemenuSubItem: DOMWrapper<HTMLElement> = wrapper.find('[data-test="category-sidemenu-sub-item"]');

    expect(categorySidemenuSubItem.classes()).toContain('button-active-state');
  });
});
