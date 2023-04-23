import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ListItemName from '@/components/ListItem/ListItemName.vue';

const MOCK_NAME: string = 'Mock Name';
const MOCK_CLASS: string = 'mock-class';

describe('ListItemName', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemName, {
      props: {
        name: MOCK_NAME,
      },
    });
  });

  it('should render content depending on name prop', () => {
    wrapper = shallowMount(ListItemName, {
      props: {
        name: MOCK_NAME,
      },
    });

    expect(wrapper.text()).toBe(MOCK_NAME);
  });

  it('should pass class attribute to span depending on class prop', () => {
    wrapper = shallowMount(ListItemName, {
      props: {
        name: MOCK_NAME,
        class: MOCK_CLASS,
      },
    });

    const name: DOMWrapper<HTMLElement> = wrapper.find('[data-test="name"]');
    const nameAttributes: Record<string, string> = name.attributes();

    expect(nameAttributes).toHaveProperty('class');
    expect(nameAttributes.class).toContain(MOCK_CLASS);
  });
});
