import { defineStore } from 'pinia';

interface LocationStoreState {
  reload: number;
  maintenance: boolean;
  offline: boolean;
  mainCategory: number | null;
  subCategory: number | null;
  searchWord: string;
  activeSearchWord: string;
}

export const useLocationStore = defineStore('location', {
  state: () => ({
    reload: 0,
    maintenance: false,
    offline: false,
    mainCategory: null,
    subCategory: null,
    searchWord: '',
    activeSearchWord: '',
  }),
  getters: {
    getMaintenance(state: LocationStoreState): boolean {
      return state.maintenance;
    },
    getOffline(state: LocationStoreState): boolean {
      return state.offline;
    },
    getMainCategory(state: LocationStoreState): number | null {
      return state.mainCategory;
    },
    getSubCategory(state: LocationStoreState): number | null {
      return state.subCategory;
    },
    getSearchWord(state: LocationStoreState): string {
      return state.searchWord;
    },
    getActiveSearchWord(state: LocationStoreState): string {
      return state.activeSearchWord;
    },
  },
  actions: {
    reloadLayout(): void {
      this.reload++;
    },
  },
});
