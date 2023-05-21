import { ComponentInternalInstance, ComponentPublicInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { useFavoritesStore } from '@/stores/favorites';
import { useLocationStore } from '@/stores/location';
import ItemFavoritesActions from '@/components/ItemFavorites/ItemFavoritesActions.vue';

const MOCK_SEARCH: string = 'Mock Search';

describe('ItemFavoritesActions', () => {
  let wrapper: VueWrapper;
  let locationStore: ReturnType<typeof useLocationStore>;
  let favoritesStore: ReturnType<typeof useFavoritesStore>;

  beforeEach(() => {
    wrapper = shallowMount(ItemFavoritesActions, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
    });

    locationStore = useLocationStore();
    favoritesStore = useFavoritesStore();
  });

  it('should add item to favorites on click', () => {
    locationStore.searchWord = MOCK_SEARCH;

    const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
      '[data-test="list-to-favorites"]',
    );

    const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
    component.emit('click');

    expect(favoritesStore.getFavorites).toEqual([MOCK_SEARCH]);
  });

  it('should remove all items from favorites on click', () => {
    locationStore.searchWord = MOCK_SEARCH;

    const listToFavoritesWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
      '[data-test="list-to-favorites"]',
    );

    const listToFavoritesComponent: ComponentInternalInstance = listToFavoritesWrapper.getCurrentComponent();
    listToFavoritesComponent.emit('click');

    expect(favoritesStore.getFavorites).toEqual([MOCK_SEARCH]);

    const allResetWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>('[data-test="all-reset"]');

    const allResetComponent: ComponentInternalInstance = allResetWrapper.getCurrentComponent();
    allResetComponent.emit('click');

    expect(favoritesStore.getFavorites).toEqual([]);
  });
});
