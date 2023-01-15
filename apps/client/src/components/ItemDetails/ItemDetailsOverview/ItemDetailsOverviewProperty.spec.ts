import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsOverviewProperty from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewProperty.vue';

const MOCK_LABEL: string = 'Mock Label';
const MOCK_VALUE: string = 'Mock Value';

describe('ItemDetailsOverviewProperty', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsOverviewProperty, {
      props: {
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      },
    });
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewProperty, {
      props: {
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      },
    });

    const label: DOMWrapper<HTMLElement> = wrapper.find('[data-test="label"]');

    expect(label.text()).toBe(MOCK_LABEL);
  });

  it('should render content depending on value prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewProperty, {
      props: {
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      },
    });

    const value: DOMWrapper<HTMLElement> = wrapper.find('[data-test="value"]');

    expect(value.text()).toBe(MOCK_VALUE);
  });
});
