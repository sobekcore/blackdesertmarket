import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsAvailability from '@/components/ItemDetails/ItemDetailsAvailability.vue';
import ItemDetailsAvailabilityHeader from '@/components/ItemDetails/ItemDetailsAvailabilityHeader.vue';

const MOCK_CONTENT: string = '<span>Mock Content</span>';

describe('ItemDetailsAvailability', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsAvailability);
  });

  it('should render ItemDetailsAvailabilityHeader component', () => {
    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ItemDetailsAvailabilityHeader);

    expect(listItemIconWrapper.exists()).toBeTruthy();
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(ItemDetailsAvailability, {
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });
});
