import { ComponentInternalInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import ItemFavorites from '@/components/ItemFavorites/ItemFavorites.vue';
import ItemFavoritesActions from '@/components/ItemFavorites/ItemFavoritesActions.vue';
import ItemFavoritesHeader from '@/components/ItemFavorites/ItemFavoritesHeader.vue';
import ItemFavoritesList from '@/components/ItemFavorites/ItemFavoritesList.vue';

describe('ItemFavorites', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemFavorites);
  });

  it('should render ItemFavoritesHeader component', () => {
    const itemFavoritesHeaderWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesHeader);

    expect(itemFavoritesHeaderWrapper.exists()).toBeTruthy();
  });

  it('should render ItemFavoritesList component', () => {
    const itemFavoritesListWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesList);

    expect(itemFavoritesListWrapper.exists()).toBeTruthy();
  });

  it('should render ItemFavoritesActions component', () => {
    const itemFavoritesActionsWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesActions);

    expect(itemFavoritesActionsWrapper.exists()).toBeTruthy();
  });

  it('should emit effect event on effect', () => {
    const itemFavoritesListWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesList);

    const component: ComponentInternalInstance = itemFavoritesListWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });
});
