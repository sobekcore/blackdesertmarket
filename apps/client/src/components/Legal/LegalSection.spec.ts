import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import LegalSection from '@/components/Legal/LegalSection.vue';
import LegalTitle from '@/components/Legal/LegalTitle.vue';

const MOCK_TITLE: string = 'Mock Title';
const MOCK_CONTENT: string = '<span>Mock Content</span>';

describe('LegalSection', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LegalSection, {
      props: {
        title: MOCK_TITLE,
      },
    });
  });

  it('should render LegalTitle component', () => {
    const legalTitleWrapper: VueWrapper = wrapper.findComponent(LegalTitle);

    expect(legalTitleWrapper.exists()).toBeTruthy();
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(LegalSection, {
      props: {
        title: MOCK_TITLE,
      },
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should pass title prop to LegalTitle depending on title prop', () => {
    wrapper = shallowMount(LegalSection, {
      props: {
        title: MOCK_TITLE,
      },
    });

    const legalTitleWrapper: VueWrapper = wrapper.findComponent(LegalTitle);
    const legalTitleAttributes: Record<string, string> = legalTitleWrapper.attributes();

    expect(legalTitleAttributes).toHaveProperty('title');
    expect(legalTitleAttributes.title).toBe(MOCK_TITLE);
  });
});
