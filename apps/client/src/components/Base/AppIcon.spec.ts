import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppIcon from '@/components/Base/AppIcon.vue';

const MOCK_ICON_SRC: string = 'images/other/in-registration-queue.png';
const MOCK_ICON_CLASS: string = 'icon-class';

describe('AppIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: MOCK_ICON_SRC,
      },
    });
  });

  it('should pass src attribute to img depending on src prop', () => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: MOCK_ICON_SRC,
      },
    });

    const icon: DOMWrapper<HTMLElement> = wrapper.find('[data-test="icon"]');
    const iconAttributes: Record<string, string> = icon.attributes();

    expect(iconAttributes).toHaveProperty('src');
    expect(iconAttributes.src).toBe(MOCK_ICON_SRC);
  });

  it('should pass class attribute to img depending on class prop', () => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: MOCK_ICON_SRC,
        class: MOCK_ICON_CLASS,
      },
    });

    const icon: DOMWrapper<HTMLElement> = wrapper.find('[data-test="icon"]');
    const iconAttributes: Record<string, string> = icon.attributes();

    expect(iconAttributes).toHaveProperty('class');
    expect(iconAttributes.class).toContain(MOCK_ICON_CLASS);
  });
});
