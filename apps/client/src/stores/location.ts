import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';

interface LocationStore {
  reload: Ref<number>;
  maintenance: Ref<boolean>;
  offline: Ref<boolean>;
  mainCategory: Ref<number | null>;
  subCategory: Ref<number | null>;
  searchWord: Ref<string>;
  activeSearchWord: Ref<string>;
  reloadLayout(): void;
}

export const useLocationStore = defineStore('location', (): LocationStore => {
  const reload: Ref<number> = ref(0);
  const maintenance: Ref<boolean> = ref(false);
  const offline: Ref<boolean> = ref(false);
  const mainCategory: Ref<number | null> = ref(null);
  const subCategory: Ref<number | null> = ref(null);
  const searchWord: Ref<string> = ref('');
  const activeSearchWord: Ref<string> = ref('');

  const reloadLayout = (): void => {
    reload.value++;
  };

  return {
    reload,
    maintenance,
    offline,
    mainCategory,
    subCategory,
    searchWord,
    activeSearchWord,
    reloadLayout,
  };
});
