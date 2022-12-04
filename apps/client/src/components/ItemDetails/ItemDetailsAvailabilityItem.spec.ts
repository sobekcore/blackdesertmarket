import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsAvailabilityItem from '@/components/ItemDetails/ItemDetailsAvailabilityItem.vue';

const MOCK_ITEM_DETAILS_AVAILABILITY_ITEM_CLASS: string = 'item-details-availability-item-class';
const MOCK_ITEM_DETAILS_AVAILABILITY_ITEM_CONTENT: string = '<span>Item Details Availability Item Content</span>';

describe('ItemDetailsAvailabilityItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsAvailabilityItem);
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(ItemDetailsAvailabilityItem, {
      slots: {
        default: `<div data-slot>${MOCK_ITEM_DETAILS_AVAILABILITY_ITEM_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_ITEM_DETAILS_AVAILABILITY_ITEM_CONTENT);
  });

  it('should pass class attribute to li depending on class prop', () => {
    wrapper = shallowMount(ItemDetailsAvailabilityItem, {
      props: {
        class: MOCK_ITEM_DETAILS_AVAILABILITY_ITEM_CLASS,
      },
    });

    const itemDetailsAvailabilityItemWrapper: DOMWrapper<HTMLElement> = wrapper.find('[data-test="item"]');
    const itemDetailsAvailabilityItemAttributes: Record<string, string> =
      itemDetailsAvailabilityItemWrapper.attributes();

    expect(itemDetailsAvailabilityItemAttributes).toHaveProperty('class');
    expect(itemDetailsAvailabilityItemAttributes.class).toContain(MOCK_ITEM_DETAILS_AVAILABILITY_ITEM_CLASS);
  });
});
