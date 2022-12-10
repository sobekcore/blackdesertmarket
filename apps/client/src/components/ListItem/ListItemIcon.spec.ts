import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppIcon from '@/components/Base/AppIcon.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';

const MOCK_LIST_ITEM_ICON_SRC: string = 'images/other/in-registration-queue.png';
const MOCK_LIST_ITEM_ICON_TEXT: string = 'List Item Icon Text';
const MOCK_LIST_ITEM_ICON_CLASS: string = 'list-item-icon-class';

describe('ListItemIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemIcon, {
      props: {
        src: MOCK_LIST_ITEM_ICON_SRC,
      },
    });
  });

  it('should render AppIcon component', () => {
    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);

    expect(iconWrapper.exists()).toBeTruthy();
  });

  it('should render content depending on text prop', () => {
    wrapper = shallowMount(ListItemIcon, {
      props: {
        src: MOCK_LIST_ITEM_ICON_SRC,
        text: MOCK_LIST_ITEM_ICON_TEXT,
      },
    });

    expect(wrapper.text()).toBe(MOCK_LIST_ITEM_ICON_TEXT);
  });

  it('should pass src prop to AppIcon depending on src prop', () => {
    wrapper = shallowMount(ListItemIcon, {
      props: {
        src: MOCK_LIST_ITEM_ICON_SRC,
      },
    });

    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);
    const iconAttributes: Record<string, string> = iconWrapper.attributes();

    expect(iconAttributes).toHaveProperty('src');
    expect(iconAttributes.src).toBe(MOCK_LIST_ITEM_ICON_SRC);
  });

  it('should pass class prop to AppIcon depending on class prop', () => {
    wrapper = shallowMount(ListItemIcon, {
      props: {
        src: MOCK_LIST_ITEM_ICON_SRC,
        class: MOCK_LIST_ITEM_ICON_CLASS,
      },
    });

    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);
    const iconAttributes: Record<string, string> = iconWrapper.attributes();

    expect(iconAttributes).toHaveProperty('class');
    expect(iconAttributes.class).toContain(MOCK_LIST_ITEM_ICON_CLASS);
  });
});
