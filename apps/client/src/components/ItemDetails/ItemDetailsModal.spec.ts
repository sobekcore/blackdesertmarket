import { ComponentInternalInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';

const MOCK_ITEM_DETAILS_MODAL_ID: number = 5600;
const MOCK_ITEM_DETAILS_MODAL_ENHANCEMENT: number = 0;

describe('ItemDetailsModal', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsModal, {
      props: {
        id: MOCK_ITEM_DETAILS_MODAL_ID,
        enhancement: MOCK_ITEM_DETAILS_MODAL_ENHANCEMENT,
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
});
