import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppDropdownIcon from '@/components/Base/AppDropdownIcon.vue';
import AppIcon from '@/components/Base/AppIcon.vue';

const MOCK_ACTIVE: boolean = true;
const MOCK_CLASS: string = 'mock-class';

describe('AppDropdownIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppDropdownIcon, {
      props: {
        active: MOCK_ACTIVE,
      },
    });
  });

  it('should render AppIcon component', () => {
    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);

    expect(iconWrapper.exists()).toBeTruthy();
  });

  it('should pass class prop to AppIcon depending on class prop', () => {
    wrapper = shallowMount(AppDropdownIcon, {
      props: {
        active: MOCK_ACTIVE,
        class: MOCK_CLASS,
      },
    });

    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);
    const iconAttributes: Record<string, string> = iconWrapper.attributes();

    expect(iconAttributes).toHaveProperty('class');
    expect(iconAttributes.class).toBe(MOCK_CLASS);
  });
});
