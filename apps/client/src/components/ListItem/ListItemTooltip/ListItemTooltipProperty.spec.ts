import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ListItemTooltipProperty from '@/components/ListItem/ListItemTooltip/ListItemTooltipProperty.vue';

const MOCK_LABEL: string = 'Mock Label';
const MOCK_VALUE: string = 'Mock Value';

describe('ListItemTooltipProperty', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemTooltipProperty, {
      props: {
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      },
    });
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ListItemTooltipProperty, {
      props: {
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      },
    });

    const label: DOMWrapper<HTMLElement> = wrapper.find('[data-test="label"]');

    expect(label.text()).toContain(MOCK_LABEL);
  });

  it('should render content depending on value prop', () => {
    wrapper = shallowMount(ListItemTooltipProperty, {
      props: {
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      },
    });

    const value: DOMWrapper<HTMLElement> = wrapper.find('[data-test="value"]');

    expect(value.text()).toBe(MOCK_VALUE);
  });
});
