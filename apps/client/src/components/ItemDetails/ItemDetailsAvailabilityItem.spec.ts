import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsAvailabilityItem from '@/components/ItemDetails/ItemDetailsAvailabilityItem.vue';

const MOCK_CLASS: string = 'mock-class';
const MOCK_CONTENT: string = '<span>Mock Content</span>';

describe('ItemDetailsAvailabilityItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsAvailabilityItem);
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(ItemDetailsAvailabilityItem, {
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should pass class attribute to li depending on class prop', () => {
    wrapper = shallowMount(ItemDetailsAvailabilityItem, {
      props: {
        class: MOCK_CLASS,
      },
    });

    const itemDetailsAvailabilityItemWrapper: DOMWrapper<HTMLElement> = wrapper.find('[data-test="item"]');
    const itemDetailsAvailabilityItemAttributes: Record<string, string> =
      itemDetailsAvailabilityItemWrapper.attributes();

    expect(itemDetailsAvailabilityItemAttributes).toHaveProperty('class');
    expect(itemDetailsAvailabilityItemAttributes.class).toContain(MOCK_CLASS);
  });
});
