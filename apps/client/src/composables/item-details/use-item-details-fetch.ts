import { BlackDesertItemDetails, BlackDesertItemDetailsExtended } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpHeader, HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemDetailsFetchReturn {
  fetch(): Promise<BlackDesertItemDetails | BlackDesertItemDetailsExtended | null>;
}

export function useItemDetailsFetch(id: number, enhancement: number, extended?: boolean): UseItemDetailsFetchReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemDetails | BlackDesertItemDetailsExtended | null> => {
    const marketApi = useMarketApi<BlackDesertItemDetails | BlackDesertItemDetailsExtended>(
      HttpMethod.GET,
      `/item/${id}/${enhancement}`,
      {
        region: preferencesStore.getRegion,
        language: preferencesStore.getLanguage,
        extended: String(extended),
      },
      {
        [HttpHeader.CACHE_CONTROL]: 'stale-if-error',
      },
    );

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
