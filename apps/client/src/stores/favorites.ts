import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface FavoritesStoreState {
  favorites: string[];
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: useLocalStorage<string[]>('favorites.favorites', []),
  }),
  getters: {
    getFavorite(state: FavoritesStoreState) {
      return (searchWord: string): string | undefined => {
        return state.favorites.find((favorite: string): boolean => {
          return favorite === searchWord;
        });
      };
    },
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
