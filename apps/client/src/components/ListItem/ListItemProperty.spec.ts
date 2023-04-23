import { VueWrapper, shallowMount } from '@vue/test-utils';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';

const MOCK_LABEL: string = 'Mock Label';
const MOCK_VALUE: string = 'Mock Value';

describe('ListItemProperty', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemProperty);
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ListItemProperty, {
      props: {
        label: MOCK_LABEL,
      },
    });

    expect(wrapper.text()).toContain(MOCK_LABEL);
  });

  it('should render content depending on value prop', () => {
    wrapper = shallowMount(ListItemProperty, {
      props: {
        value: MOCK_VALUE,
      },
    });

    expect(wrapper.text()).toContain(MOCK_VALUE);
  });
});
