import { BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemDetailsReturn {
  fetch(): Promise<BlackDesertItemDetails | null>;
}

export function useItemDetails(id: number, enhancement: number): UseItemDetailsReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemDetails | null> => {
    const marketApi = useMarketApi<BlackDesertItemDetails>(HttpMethod.GET, `/item/${id}/${enhancement}`, {
      region: preferencesStore.getRegion,
      language: preferencesStore.getLanguage,
    });

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch item details from market API');
    }

    if (response.data.value) {
      return response.data.value.data;
    }

    return null;
  };

  return {
    fetch,
  };
}
