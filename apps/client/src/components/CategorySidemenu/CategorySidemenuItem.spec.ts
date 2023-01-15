import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppDropdownIcon from '@/components/Base/AppDropdownIcon.vue';
import AppIcon from '@/components/Base/AppIcon.vue';
import CategorySidemenuItem from '@/components/CategorySidemenu/CategorySidemenuItem.vue';

const MOCK_TITLE: string = 'Mock Title';
const MOCK_ICON: string = 'images/other/in-registration-queue.png';
const MOCK_ACTIVE: boolean = true;
const MOCK_CONTENT: string = '<span>Category Sidemenu Item Content</span>';

describe('CategorySidemenuItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategorySidemenuItem, {
      props: {
        title: MOCK_TITLE,
        icon: MOCK_ICON,
      },
    });
  });

  it('should render AppIcon component', () => {
    const iconWrapper: VueWrapper = wrapper.findComponent(AppIcon);

    expect(iconWrapper.exists()).toBeTruthy();
  });

  it('should render AppDropdownIcon component', () => {
    const dropdownIconWrapper: VueWrapper = wrapper.findComponent(AppDropdownIcon);

    expect(dropdownIconWrapper.exists()).toBeTruthy();
  });

  it('should render before slot content', () => {
    wrapper = shallowMount(CategorySidemenuItem, {
      slots: {
        before: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
      props: {
        title: MOCK_TITLE,
        icon: MOCK_ICON,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should render after slot content', () => {
    wrapper = shallowMount(CategorySidemenuItem, {
      slots: {
        after: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
      props: {
        title: MOCK_TITLE,
        icon: MOCK_ICON,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(CategorySidemenuItem, {
      props: {
        title: MOCK_TITLE,
        icon: MOCK_ICON,
      },
    });

    expect(wrapper.text()).toBe(MOCK_TITLE);
  });

  it('should emit effect event on click', () => {
    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');
    button.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass active prop to AppDropdownIcon depending on active prop', () => {
    wrapper = shallowMount(CategorySidemenuItem, {
      props: {
        title: MOCK_TITLE,
        icon: MOCK_ICON,
        active: MOCK_ACTIVE,
      },
    });

    const dropdownIconWrapper: VueWrapper = wrapper.findComponent(AppDropdownIcon);
    const dropdownIconAttributes: Record<string, string> = dropdownIconWrapper.attributes();

    expect(dropdownIconAttributes).toHaveProperty('active');
    expect(dropdownIconAttributes.active).toBe(String(MOCK_ACTIVE));
  });

  it('should contain class depending on active prop', () => {
    wrapper = shallowMount(CategorySidemenuItem, {
      props: {
        title: MOCK_TITLE,
        icon: MOCK_ICON,
        active: MOCK_ACTIVE,
      },
    });

    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');

    expect(button.classes()).toContain('button-active-state');
  });
});
