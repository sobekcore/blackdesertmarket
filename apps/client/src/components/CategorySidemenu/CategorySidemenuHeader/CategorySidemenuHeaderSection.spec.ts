import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import CategorySidemenuHeaderSection from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeaderSection.vue';

const MOCK_TITLE: string = 'Mock Title';
const MOCK_CONTENT: string = '<span>Mock Content</span>';

describe('CategorySidemenuHeaderSection', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategorySidemenuHeaderSection, {
      props: {
        title: MOCK_TITLE,
      },
    });
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(CategorySidemenuHeaderSection, {
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
      props: {
        title: MOCK_TITLE,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(CategorySidemenuHeaderSection, {
      props: {
        title: MOCK_TITLE,
      },
    });

    expect(wrapper.text()).toBe(MOCK_TITLE);
  });
});
