import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface FavoritesStore {
  favorites: RemovableRef<string[]>;
  getFavorite(searchWord: string): string | undefined;
  addFavorite(searchWord: string): void;
  removeFavorite(searchWord: string): void;
  removeFavorites(): void;
}

export const useFavoritesStore = defineStore('favorites', (): FavoritesStore => {
  const favorites: RemovableRef<string[]> = useLocalStorage<string[]>('favorites.favorites', []);

  const getFavorite = (searchWord: string): string | undefined => {
    return favorites.value.find((favorite: string): boolean => {
      return favorite === searchWord;
    });
  };

  const addFavorite = (searchWord: string): void => {
    if (!searchWord) {
      return;
    }

    if (favorites.value.length < 10 && !favorites.value.includes(searchWord)) {
      favorites.value.push(searchWord);
    }
  };

  const removeFavorite = (searchWord: string): void => {
    const index: number = favorites.value.findIndex((favorite: string): boolean => {
      return favorite === searchWord;
    });

    if (index !== -1) {
      favorites.value.splice(index, 1);
    }
  };

  const removeFavorites = (): void => {
    favorites.value = [];
  };

  return {
    favorites,
    getFavorite,
    addFavorite,
    removeFavorite,
    removeFavorites,
  };
});
