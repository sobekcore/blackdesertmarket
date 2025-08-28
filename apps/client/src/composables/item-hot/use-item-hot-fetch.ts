import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpHeader, HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemHotFetchReturn {
  fetch(): Promise<BlackDesertItemHot[]>;
}

export function useItemHotFetch(): UseItemHotFetchReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemHot[]> => {
    const marketApi = useMarketApi<BlackDesertItemHot[]>(
      HttpMethod.GET,
      '/list/hot',
      {
        region: preferencesStore.region,
        language: preferencesStore.language,
      },
      {
        headers: {
          [HttpHeader.CACHE_CONTROL]: 'stale-if-error',
        },
      },
    );

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch hot item list from market API');
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
