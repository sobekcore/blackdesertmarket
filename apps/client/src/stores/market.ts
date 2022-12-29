import { defineStore } from 'pinia';

interface MarketStoreState {
  maintenance: boolean;
}

export const useMarketStore = defineStore('market', {
  state: (): MarketStoreState => ({
    maintenance: false,
  }),
  getters: {
    getMaintenance(state: MarketStoreState): boolean {
      return state.maintenance;
    },
  },
});
