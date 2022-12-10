import { VueWrapper, shallowMount } from '@vue/test-utils';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';

const MOCK_LIST_ITEM_PROPERTY_LABEL: string = 'List Item Property Label';
const MOCK_LIST_ITEM_PROPERTY_VALUE: string = 'List Item Property Value';

describe('ListItemProperty', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemProperty);
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ListItemProperty, {
      props: {
        label: MOCK_LIST_ITEM_PROPERTY_LABEL,
      },
    });

    expect(wrapper.text()).toContain(MOCK_LIST_ITEM_PROPERTY_LABEL);
  });

  it('should render content depending on value prop', () => {
    wrapper = shallowMount(ListItemProperty, {
      props: {
        value: MOCK_LIST_ITEM_PROPERTY_VALUE,
      },
    });

    expect(wrapper.text()).toContain(MOCK_LIST_ITEM_PROPERTY_VALUE);
  });
});
