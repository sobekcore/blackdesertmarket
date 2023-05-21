import { Composer } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { config } from '@/config';

interface PreferencesStoreState {
  region: string;
  language: string;
}

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    region: useLocalStorage<string>('preferences.region', config.defaultRegion),
    language: useLocalStorage<string>('preferences.language', config.defaultLanguage),
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
