import { Composer } from 'vue-i18n';
import { defineStore } from 'pinia';
import { config } from '@/config';

interface PreferencesStoreState {
  region: string;
  language: string;
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): PreferencesStoreState => ({
    region: config.defaultRegion,
    language: config.defaultLanguage,
  }),
  getters: {
    getRegion(state: PreferencesStoreState): string {
      return state.region;
    },
    getLanguage(state: PreferencesStoreState): string {
      return state.language;
    },
  },
  actions: {
    setLanguage(i18n: Composer, language: string): void {
      i18n.locale.value = language;
      this.language = language;
    },
  },
});
