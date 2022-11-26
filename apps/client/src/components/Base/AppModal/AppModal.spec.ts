import { ComponentInternalInstance } from 'vue';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { UnitTestException } from '@/exceptions/unit-test-exception';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import AppModalBackdrop from '@/components/Base/AppModal/AppModalBackdrop.vue';
import AppModalClose from '@/components/Base/AppModal/AppModalClose.vue';
import AppModalTitle from '@/components/Base/AppModal/AppModalTitle.vue';

const MODAL_TITLE: string = 'Modal Title';
const MODAL_CONTENT: string = '<span>Modal Content</span>';

describe('AppModal', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MODAL_TITLE,
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
        default: `<div data-slot>${MODAL_CONTENT}</div>`,
      },
      props: {
        title: MODAL_TITLE,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MODAL_CONTENT);
  });

  it('should handle close event from AppModalClose', () => {
    const modalCloseWrapper: VueWrapper = wrapper.findComponent(AppModalClose);
    modalCloseWrapper.trigger('close');

    const emitted: Record<string, unknown[]> = modalCloseWrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass prop to AppModalTitle depending on title prop', () => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MODAL_TITLE,
      },
    });

    const modalTitleWrapper: VueWrapper = wrapper.findComponent(AppModalTitle);
    const modalTitleAttributes: Record<string, string> = modalTitleWrapper.attributes();

    expect(modalTitleAttributes).toHaveProperty('title');
    expect(modalTitleAttributes.title).toBe(MODAL_TITLE);
  });

  it('should contain class depending on fullsize prop', () => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MODAL_TITLE,
        fullsize: true,
      },
    });

    const component: ComponentInternalInstance = wrapper.getCurrentComponent();
    const modal: unknown = component.refs.modal;

    if (!(modal instanceof HTMLElement)) {
      throw new UnitTestException('Could not find modal ref in AppModal');
    }

    const inner: HTMLDivElement | null = modal.querySelector('div');

    if (!(inner instanceof HTMLDivElement)) {
      throw new UnitTestException('Could not find inner HTMLDivElement element');
    }

    expect(inner.classList.contains('h-[90vh]')).toBeTruthy();
    expect(inner.classList.contains('w-[90vw]')).toBeTruthy();
  });

  it('should contain class depending on draggable prop', () => {
    wrapper = shallowMount(AppModal, {
      props: {
        title: MODAL_TITLE,
        draggable: true,
      },
    });

    const component: ComponentInternalInstance = wrapper.getCurrentComponent();
    const handle: unknown = component.refs.handle;

    if (!(handle instanceof HTMLElement)) {
      throw new UnitTestException('Could not find handle ref in AppModal');
    }

    expect(handle.classList.contains('cursor-move')).toBeTruthy();
  });
});
