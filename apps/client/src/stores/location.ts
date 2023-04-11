import { defineStore } from 'pinia';

interface LocationStoreState {
  reload: number;
  maintenance: boolean;
  mainCategory: number | null;
  subCategory: number | null;
}

export const useLocationStore = defineStore('location', {
  state: (): LocationStoreState => ({
    reload: 0,
    maintenance: false,
    mainCategory: null,
    subCategory: null,
  }),
  getters: {
    getMaintenance(state: LocationStoreState): boolean {
      return state.maintenance;
    },
    getMainCategory(state: LocationStoreState): number | null {
      return state.mainCategory;
    },
    getSubCategory(state: LocationStoreState): number | null {
      return state.subCategory;
    },
  },
  actions: {
    reloadLayout(): void {
      this.reload++;
    },
  },
});
