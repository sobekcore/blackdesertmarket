import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsOverviewButton from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewButton.vue';

const MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_LABEL: string = 'Mock Item Details Overview Button Label';
const MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_ACTIVE: boolean = true;

describe('ItemDetailsOverviewButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsOverviewButton, {
      props: {
        label: MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_LABEL,
      },
    });
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewButton, {
      props: {
        label: MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_LABEL,
      },
    });

    expect(wrapper.text()).toBe(MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_LABEL);
  });

  it('should contain class depending on active prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewButton, {
      props: {
        label: MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_LABEL,
        active: MOCK_ITEM_DETAILS_OVERVIEW_BUTTON_ACTIVE,
      },
    });

    const outer: DOMWrapper<HTMLElement> = wrapper.find('[data-test="outer"]');

    expect(outer.classes()).toContain('button-active-state');
  });
});
