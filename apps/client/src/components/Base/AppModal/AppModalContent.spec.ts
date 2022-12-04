import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppModalContent from '@/components/Base/AppModal/AppModalContent.vue';

const MOCK_MODAL_CONTENT: string = '<span>Modal Content</span>';

describe('AppModalContent', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModalContent);
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(AppModalContent, {
      slots: {
        default: `<div data-slot>${MOCK_MODAL_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_MODAL_CONTENT);
  });
});
