import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { useFavoritesStore } from '@/stores/favorites';
import { useLocationStore } from '@/stores/location';
import ItemFavoritesItem from '@/components/ItemFavorites/ItemFavoritesItem.vue';

const MOCK_INDEX: number = 1;
const MOCK_SEARCH_WORD: string = 'Mock Search Word';

describe('ItemFavoritesItem', () => {
  let wrapper: VueWrapper;
  let locationStore: ReturnType<typeof useLocationStore>;
  let favoritesStore: ReturnType<typeof useFavoritesStore>;

  beforeEach(() => {
    wrapper = shallowMount(ItemFavoritesItem, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
        renderStubDefaultSlot: true,
      },
      props: {
        index: MOCK_INDEX,
        searchWord: MOCK_SEARCH_WORD,
      },
    });

    locationStore = useLocationStore();
    favoritesStore = useFavoritesStore();
  });

  it('should render content depending on index and searchWord props', () => {
    const label: DOMWrapper<HTMLElement> = wrapper.find('[data-test="label"]');

    expect(label.text()).toBe(`${MOCK_INDEX}. ${MOCK_SEARCH_WORD}`);
  });

  it('should emit effect event on click', () => {
    const searchButton: DOMWrapper<HTMLElement> = wrapper.find('[data-test="search-button"]');
    searchButton.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should update activeSearchWord in store on click', () => {
    const searchButton: DOMWrapper<HTMLElement> = wrapper.find('[data-test="search-button"]');
    searchButton.trigger('click');

    expect(locationStore.getActiveSearchWord).toBe(MOCK_SEARCH_WORD);
  });

  it('should remove item from favorites on click', () => {
    favoritesStore.addFavorite(MOCK_SEARCH_WORD);

    const searchButton: DOMWrapper<HTMLElement> = wrapper.find('[data-test="remove-button"]');
    searchButton.trigger('click');

    expect(favoritesStore.getFavorites).toEqual([]);
  });
});
