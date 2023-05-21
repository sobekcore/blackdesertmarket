import { ComponentInternalInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { useFavoritesStore } from '@/stores/favorites';
import ItemFavoritesItem from '@/components/ItemFavorites/ItemFavoritesItem.vue';
import ItemFavoritesList from '@/components/ItemFavorites/ItemFavoritesList.vue';

const MOCK_SEARCH_WORD: string = 'Mock Search Word';

describe('ItemFavoritesList', () => {
  let wrapper: VueWrapper;
  let favoritesStore: ReturnType<typeof useFavoritesStore>;

  beforeEach(() => {
    wrapper = shallowMount(ItemFavoritesList, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
    });

    favoritesStore = useFavoritesStore();
    favoritesStore.addFavorite(MOCK_SEARCH_WORD);
  });

  it('should render ItemFavoritesItem component', async () => {
    const itemFavoritesItemWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesItem);

    expect(itemFavoritesItemWrapper.exists()).toBeTruthy();
  });

  it('should emit effect event on effect', () => {
    const itemFavoritesItemWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesItem);

    const component: ComponentInternalInstance = itemFavoritesItemWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass index prop to ItemFavoritesItem', () => {
    const itemFavoritesItemWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesItem);
    const itemFavoritesItemVM: Record<string, any> = itemFavoritesItemWrapper.vm as Record<string, any>;

    expect(itemFavoritesItemVM).toHaveProperty('index');
    expect(itemFavoritesItemVM.index).toBe(1);
  });

  it('should pass searchWord prop to ItemFavoritesItem', () => {
    const itemFavoritesItemWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesItem);
    const itemFavoritesItemVM: Record<string, any> = itemFavoritesItemWrapper.vm as Record<string, any>;

    expect(itemFavoritesItemVM).toHaveProperty('searchWord');
    expect(itemFavoritesItemVM.searchWord).toBe(MOCK_SEARCH_WORD);
  });
});
