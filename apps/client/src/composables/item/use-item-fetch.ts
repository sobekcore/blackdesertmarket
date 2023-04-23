import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemFetchReturn {
  fetch(): Promise<BlackDesertItem[]>;
}

export function useItemFetch(mainCategory: number, subCategory: number): UseItemFetchReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItem[]> => {
    const marketApi = useMarketApi<BlackDesertItem[]>(HttpMethod.GET, `/list/${mainCategory}/${subCategory}`, {
      region: preferencesStore.getRegion,
      language: preferencesStore.getLanguage,
    });

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch category item list from market API');
    }

    if (response.data.value) {
      return response.data.value.data;
    }

    return [];
  };

  return {
    fetch,
  };
}
