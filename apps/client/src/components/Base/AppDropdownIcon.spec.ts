import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppDropdownIcon from '@/components/Base/AppDropdownIcon.vue';
import AppIcon from '@/components/Base/AppIcon.vue';

const DROPDOWN_ICON_ACTIVE: boolean = true;
const DROPDOWN_ICON_CLASS: string = 'dropdown-icon-class';

describe('AppDropdownIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppDropdownIcon, {
      props: {
        active: DROPDOWN_ICON_ACTIVE,
      },
    });
  });

  it('should render AppIcon component', () => {
    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);

    expect(iconWrapper.exists()).toBeTruthy();
  });

  it('should pass prop to AppIcon depending on class prop', () => {
    wrapper = shallowMount(AppDropdownIcon, {
      props: {
        active: DROPDOWN_ICON_ACTIVE,
        class: DROPDOWN_ICON_CLASS,
      },
    });

    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);
    const iconAttributes: Record<string, string> = iconWrapper.attributes();

    expect(iconAttributes).toHaveProperty('class');
    expect(iconAttributes.class).toBe(DROPDOWN_ICON_CLASS);
  });
});
