import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsOverviewProperty from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewProperty.vue';

const MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_LABEL: string = 'Mock Item Details Overview Property Label';
const MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_VALUE: string = 'Mock Item Details Overview Property Value';

describe('ItemDetailsOverviewProperty', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsOverviewProperty, {
      props: {
        label: MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_LABEL,
        value: MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_VALUE,
      },
    });
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewProperty, {
      props: {
        label: MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_LABEL,
        value: MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_VALUE,
      },
    });

    const label: DOMWrapper<HTMLElement> = wrapper.find('[data-test="label"]');

    expect(label.text()).toBe(MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_LABEL);
  });

  it('should render content depending on value prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewProperty, {
      props: {
        label: MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_LABEL,
        value: MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_VALUE,
      },
    });

    const value: DOMWrapper<HTMLElement> = wrapper.find('[data-test="value"]');

    expect(value.text()).toBe(MOCK_ITEM_DETAILS_OVERVIEW_PROPERTY_VALUE);
  });
});
