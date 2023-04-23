import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppLink from '@/components/Base/AppLink.vue';

const MOCK_URL: string = 'https://api.blackdesertmarket.com';

describe('AppLink', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppLink, {
      props: {
        url: MOCK_URL,
      },
    });
  });

  it('should pass href attribute to a depending on url prop', () => {
    wrapper = shallowMount(AppLink, {
      props: {
        url: MOCK_URL,
      },
    });

    const link: DOMWrapper<HTMLElement> = wrapper.find('[data-test="link"]');
    const linkAttributes: Record<string, string> = link.attributes();

    expect(linkAttributes).toHaveProperty('href');
    expect(linkAttributes.href).toBe(MOCK_URL);
  });

  it('should render content depending on url prop', () => {
    wrapper = shallowMount(AppLink, {
      props: {
        url: MOCK_URL,
      },
    });

    expect(wrapper.text()).toBe(MOCK_URL);
  });
});
