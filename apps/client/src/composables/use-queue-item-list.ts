import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseQueueItemListReturn {
  fetch(): Promise<BlackDesertItemType[]>;
}

export function useQueueItemList(): UseQueueItemListReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemType[]> => {
    const marketApi = useMarketApi<BlackDesertItemType[]>(HttpMethod.GET, '/list/queue', {
      region: preferencesStore.getRegion,
      language: preferencesStore.getLanguage,
    });

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
