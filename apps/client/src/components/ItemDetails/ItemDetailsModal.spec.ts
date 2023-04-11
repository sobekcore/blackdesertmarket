import { ComponentInternalInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockProvide } from '@test/mocks/provide.mock';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';

const MOCK_ID: number = 5600;
const MOCK_ENHANCEMENT: number = 0;

describe('ItemDetailsModal', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsModal, {
      global: {
        provide: mockProvide(),
      },
      props: {
        id: MOCK_ID,
        enhancement: MOCK_ENHANCEMENT,
      },
    });
  });

  it('should render AppModal component', () => {
    const modalWrapper: VueWrapper = wrapper.findComponent(AppModal);

    expect(modalWrapper.exists()).toBeTruthy();
  });

  it('should handle close event from AppModal', () => {
    const modalWrapper: VueWrapper = wrapper.findComponent(AppModal);

    const component: ComponentInternalInstance = modalWrapper.getCurrentComponent();
    component.emit('close');

    const emitted: Record<string, unknown[]> = modalWrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should emit close event on close', () => {
    const modalWrapper: VueWrapper = wrapper.findComponent(AppModal);

    const component: ComponentInternalInstance = modalWrapper.getCurrentComponent();
    component.emit('close');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });
});
