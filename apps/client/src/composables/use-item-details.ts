import { BlackDesertItemDetails, BlackDesertItemDetailsExtended } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemDetailsReturn {
  fetch(): Promise<BlackDesertItemDetails | BlackDesertItemDetailsExtended | null>;
}

/**
 * TODO: Split useItemDetails into two composables where the first one will fetch data
 *  and second one will execute operations on given BlackDesertItemDetails object
 */
export function useItemDetails(id: number, enhancement: number, extended?: boolean): UseItemDetailsReturn {
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
