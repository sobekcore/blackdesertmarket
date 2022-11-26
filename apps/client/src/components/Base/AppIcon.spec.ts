import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppIcon from '@/components/Base/AppIcon.vue';

const ICON_SRC: string = '@/assets/images/other/in-registration-queue.png';
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

  it('should pass attribute to img depending on src prop', () => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: ICON_SRC,
      },
    });

    const img: DOMWrapper<HTMLImageElement> = wrapper.find('img');
    const imgAttributes: Record<string, string> = img.attributes();

    expect(imgAttributes).toHaveProperty('src');
    expect(imgAttributes.src).toBe(ICON_SRC);
  });

  it('should pass attribute to img depending on class prop', () => {
    wrapper = shallowMount(AppIcon, {
      props: {
        src: ICON_SRC,
        class: ICON_CLASS,
      },
    });

    const img: DOMWrapper<HTMLImageElement> = wrapper.find('img');
    const imgAttributes: Record<string, string> = img.attributes();

    expect(imgAttributes).toHaveProperty('class');
    expect(imgAttributes.class).toContain(ICON_CLASS);
  });
});
