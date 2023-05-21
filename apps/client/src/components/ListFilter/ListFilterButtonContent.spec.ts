import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppIcon from '@/components/Base/AppIcon.vue';
import ListFilterButtonContent from '@/components/ListFilter/ListFilterButtonContent.vue';

const MOCK_ICON: string = 'other/in-registration-queue.png';
const MOCK_CLASS: string = 'mock-class';
const MOCK_ICON_CLASS: string = 'mock-icon-class';

describe('ListFilterButtonContent', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListFilterButtonContent, {
      props: {
        icon: MOCK_ICON,
      },
    });
  });

  it('should pass src prop to AppIcon depending on icon prop', () => {
    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);
    const itemVM: Record<string, any> = iconWrapper.vm as Record<string, any>;

    expect(itemVM).toHaveProperty('src');
    expect(itemVM.src).toBe(MOCK_ICON);
  });

  it('should pass class attribute to span depending on class prop', () => {
    wrapper = shallowMount(ListFilterButtonContent, {
      props: {
        icon: MOCK_ICON,
        class: MOCK_CLASS,
      },
    });

    const outer: DOMWrapper<HTMLElement> = wrapper.find('[data-test="outer"]');
    const outerAttributes: Record<string, string> = outer.attributes();

    expect(outerAttributes).toHaveProperty('class');
    expect(outerAttributes.class).toContain(MOCK_CLASS);
  });

  it('should pass class prop to AppIcon depending on iconClass prop', () => {
    wrapper = shallowMount(ListFilterButtonContent, {
      props: {
        icon: MOCK_ICON,
        iconClass: MOCK_ICON_CLASS,
      },
    });

    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);
    const itemVM: Record<string, any> = iconWrapper.vm as Record<string, any>;

    expect(itemVM).toHaveProperty('src');
    expect(itemVM.src).toBe(MOCK_ICON);
  });
});
