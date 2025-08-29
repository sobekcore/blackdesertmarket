import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpHeader, HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseQueueItemListReturn {
  fetch(): Promise<BlackDesertItemQueue[]>;
}

export function useItemQueueFetch(): UseQueueItemListReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemQueue[]> => {
    const marketApi = useMarketApi<BlackDesertItemQueue[]>(
      HttpMethod.GET,
      '/list/queue',
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
      throw new ComposableException('Could not fetch queue item list from market API');
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
