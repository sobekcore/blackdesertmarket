import { ComponentInternalInstance } from 'vue';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { UnitTestException } from '@/exceptions/unit-test-exception';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import AppModalBackdrop from '@/components/Base/AppModal/AppModalBackdrop.vue';
import AppModalClose from '@/components/Base/AppModal/AppModalClose.vue';
import AppModalTitle from '@/components/Base/AppModal/AppModalTitle.vue';

const MOCK_TITLE: string = 'Mock Title';
const MOCK_CONTENT: string = '<span>Mock Content</span>';

describe('AppModal', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MOCK_TITLE,
      },
    });
  });

  it('should render AppModalTitle component', () => {
    const modalTitleWrapper: VueWrapper = wrapper.findComponent(AppModalTitle);

    expect(modalTitleWrapper.exists()).toBeTruthy();
  });

  it('should render AppModalClose component', () => {
    const modalCloseWrapper: VueWrapper = wrapper.findComponent(AppModalClose);

    expect(modalCloseWrapper.exists()).toBeTruthy();
  });

  it('should render AppModalBackdrop component', () => {
    const modalBackdropWrapper: VueWrapper = wrapper.findComponent(AppModalBackdrop);

    expect(modalBackdropWrapper.exists()).toBeTruthy();
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(AppModal, {
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
      props: {
        title: MOCK_TITLE,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should handle close event from AppModalClose', () => {
    const modalCloseWrapper: VueWrapper = wrapper.findComponent(AppModalClose);

    const component: ComponentInternalInstance = modalCloseWrapper.getCurrentComponent();
    component.emit('close');

    const emitted: Record<string, unknown[]> = modalCloseWrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass title prop to AppModalTitle depending on title prop', () => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MOCK_TITLE,
      },
    });

    const modalTitleWrapper: VueWrapper = wrapper.findComponent(AppModalTitle);
    const modalTitleAttributes: Record<string, string> = modalTitleWrapper.attributes();

    expect(modalTitleAttributes).toHaveProperty('title');
    expect(modalTitleAttributes.title).toBe(MOCK_TITLE);
  });

  it('should contain class depending on fullsize prop', () => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MOCK_TITLE,
        fullsize: true,
      },
    });

    const inner: DOMWrapper<HTMLElement> = wrapper.find('[data-test="inner"]');

    expect(inner.classes()).toContain('modal-active-fullsize');
  });

  it('should contain class depending on draggable prop', () => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MOCK_TITLE,
        draggable: true,
      },
    });

    const component: ComponentInternalInstance = wrapper.getCurrentComponent();
    const handle: unknown = component.refs.handle;

    if (!(handle instanceof HTMLElement)) {
      throw new UnitTestException('Could not find handle ref in AppModal');
    }

    expect(handle.classList.contains('modal-handle-draggable')).toBeTruthy();
  });
});
