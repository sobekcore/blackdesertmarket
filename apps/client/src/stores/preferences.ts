import { Composer } from 'vue-i18n';
import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { config } from '@/config';

interface PreferencesStore {
  region: RemovableRef<string>;
  language: RemovableRef<string>;
  setLanguage(i18n: Composer, lang: string): void;
}

export const usePreferencesStore = defineStore('preferences', (): PreferencesStore => {
  const region: RemovableRef<string> = useLocalStorage<string>('preferences.region', config.defaultRegion);
  const language: RemovableRef<string> = useLocalStorage<string>('preferences.language', config.defaultLanguage);

  const setLanguage = (i18n: Composer, lang: string): void => {
    document.documentElement.lang = lang;
    i18n.locale.value = lang;

    language.value = lang;
  };

  return {
    region,
    language,
    setLanguage,
  };
});
