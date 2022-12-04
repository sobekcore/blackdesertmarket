import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ListItemName from '@/components/ListItem/ListItemName.vue';

const MOCK_LIST_ITEM_NAME_NAME: string = 'List Item Name Name';
const MOCK_LIST_ITEM_NAME_CLASS: string = 'list-item-name-class';

describe('ListItemName', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemName, {
      props: {
        name: MOCK_LIST_ITEM_NAME_NAME,
      },
    });
  });

  it('should render content depending on name prop', () => {
    wrapper = shallowMount(ListItemName, {
      props: {
        name: MOCK_LIST_ITEM_NAME_NAME,
      },
    });

    expect(wrapper.text()).toBe(MOCK_LIST_ITEM_NAME_NAME);
  });

  it('should pass class attribute to span depending on class prop', () => {
    wrapper = shallowMount(ListItemName, {
      props: {
        name: MOCK_LIST_ITEM_NAME_NAME,
        class: MOCK_LIST_ITEM_NAME_CLASS,
      },
    });

    const name: DOMWrapper<HTMLElement> = wrapper.find('[data-test="name"]');
    const nameAttributes: Record<string, string> = name.attributes();

    expect(nameAttributes).toHaveProperty('class');
    expect(nameAttributes.class).toContain(MOCK_LIST_ITEM_NAME_CLASS);
  });
});
