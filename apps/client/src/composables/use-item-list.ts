import { usePreferencesStore } from '@/stores/preferences';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { useMarketApi } from '@/composables/use-market-api';
import { HttpMethod } from '@/enums/http';
import { ComposableException } from '@/exceptions/composable-exception';

export interface UseItemTypeListReturn {
  fetch(): Promise<BlackDesertItemType[]>;
}

export function useItemList(id: number): UseItemTypeListReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemType[]> => {
    const marketApi = useMarketApi<BlackDesertItemType[]>(HttpMethod.GET, `/item/${id}`, {
      region: preferencesStore.getRegion,
      language: preferencesStore.getLanguage,
    });

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch item type list from market API');
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
