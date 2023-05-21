import { ComponentInternalInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockProvide } from '@test/mocks/provide.mock';
import AppModal from '@/components/Base/AppModal/AppModal.vue';
import ItemFavorites from '@/components/ItemFavorites/ItemFavorites.vue';
import ItemFavoritesModal from '@/components/ItemFavorites/ItemFavoritesModal.vue';

describe('ItemFavoritesModal', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemFavoritesModal, {
      global: {
        provide: mockProvide(),
        renderStubDefaultSlot: true,
      },
    });
  });

  it('should render AppModal component', () => {
    const modalWrapper: VueWrapper = wrapper.findComponent(AppModal);

    expect(modalWrapper.exists()).toBeTruthy();
  });

  it('should render ItemFavorites component', () => {
    const itemFavoritesWrapper: VueWrapper = wrapper.findComponent(ItemFavorites);

    expect(itemFavoritesWrapper.exists()).toBeTruthy();
  });

  it('should emit close event on close', () => {
    const modalWrapper: VueWrapper = wrapper.findComponent(AppModal);

    const component: ComponentInternalInstance = modalWrapper.getCurrentComponent();
    component.emit('close');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should emit close event on effect', () => {
    const itemFavoritesWrapper: VueWrapper = wrapper.findComponent(ItemFavorites);

    const component: ComponentInternalInstance = itemFavoritesWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });
});
