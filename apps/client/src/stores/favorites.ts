import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface FavoritesStoreState {
  favorites: string[];
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesStoreState => ({
    /**
     * Reactive properties are automatically unwrapped by Pinia when accessing state
     * To use the same interface here we need to typecast them to non-reactive types
     */
    favorites: useLocalStorage<string[]>('favorites', []) as unknown as string[],
  }),
  getters: {
    getFavorites(state: FavoritesStoreState): string[] {
      return state.favorites;
    },
  },
  actions: {
    addFavorite(searchWord: string): void {
      if (!searchWord) {
        return;
      }

      if (this.favorites.length < 10 && !this.favorites.includes(searchWord)) {
        this.favorites.push(searchWord);
      }
    },
    removeFavorite(searchWord: string): void {
      const index: number = this.favorites.findIndex((favorite: string): boolean => {
        return favorite === searchWord;
      });

      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
    removeFavorites(): void {
      this.favorites = [];
    },
  },
});
