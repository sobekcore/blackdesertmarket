import { defineStore } from 'pinia';

interface LocationStoreState {
  mainCategory: number | null;
  subCategory: number | null;
}

export const useLocationStore = defineStore('location', {
  state: (): LocationStoreState => ({
    mainCategory: null,
    subCategory: null,
  }),
  getters: {
    getMainCategory(state: LocationStoreState): number | null {
      return state.mainCategory;
    },
    getSubCategory(state: LocationStoreState): number | null {
      return state.subCategory;
    },
  },
});
