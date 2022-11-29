import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppIcon from '@/components/Base/AppIcon.vue';

const ICON_SRC: string = 'images/other/in-registration-queue.png';
const ICON_CLASS: string = 'icon-class';

describe('AppIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: ICON_SRC,
      },
    });
  });

  it('should pass src attribute to img depending on src prop', () => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: ICON_SRC,
      },
    });

    const icon: DOMWrapper<HTMLElement> = wrapper.find('[data-test="icon"]');
    const iconAttributes: Record<string, string> = icon.attributes();

    expect(iconAttributes).toHaveProperty('src');
    expect(iconAttributes.src).toBe(ICON_SRC);
  });

  it('should pass class attribute to img depending on class prop', () => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: ICON_SRC,
        class: ICON_CLASS,
      },
    });

    const icon: DOMWrapper<HTMLElement> = wrapper.find('[data-test="icon"]');
    const iconAttributes: Record<string, string> = icon.attributes();

    expect(iconAttributes).toHaveProperty('class');
    expect(iconAttributes.class).toContain(ICON_CLASS);
  });
});
