import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import LegalDescription from '@/components/Legal/LegalDescription.vue';

const MOCK_CONTENT: string = '<span>Mock Content</span>';

describe('LegalDescription', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LegalDescription);
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(LegalDescription, {
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });
});
