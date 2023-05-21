import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppNotification from '@/components/Base/AppNotification.vue';

const MOCK_TITLE: string = 'Mock Title';
const MOCK_MESSAGE: string = 'Mock Message';

describe('AppNotification', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppNotification, {
      props: {
        title: MOCK_TITLE,
        message: MOCK_MESSAGE,
      },
    });
  });

  it('should render content depending on title prop', () => {
    const title: DOMWrapper<HTMLElement> = wrapper.find('[data-test="title"]');

    expect(title.text()).toBe(MOCK_TITLE);
  });

  it('should render content depending on message prop', () => {
    const message: DOMWrapper<HTMLElement> = wrapper.find('[data-test="message"]');

    expect(message.text()).toBe(MOCK_MESSAGE);
  });
});
