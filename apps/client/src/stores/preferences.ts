import { defineStore } from 'pinia';

interface PreferencesStoreState {
  region: string;
  language: string;
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): PreferencesStoreState => ({
    region: 'eu',
    language: 'en-US',
  }),
  getters: {
    getRegion(state: PreferencesStoreState): string {
      return state.region;
    },
    getLanguage(state: PreferencesStoreState): string {
      return state.language;
    },
  },
});
