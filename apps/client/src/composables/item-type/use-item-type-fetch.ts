import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpHeader, HttpMethod } from '@/enums/http';
import { usePreferencesStore } from '@/stores/preferences';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemTypeFetchReturn {
  fetch(): Promise<BlackDesertItemType[]>;
  fetchBaseType(): Promise<BlackDesertItemType | null>;
  fetchByEnhancement(enhancement: number): Promise<BlackDesertItemType | null>;
}

export function useItemTypeFetch(id: number): UseItemTypeFetchReturn {
  const preferencesStore = usePreferencesStore();

  const fetch = async (): Promise<BlackDesertItemType[]> => {
    const marketApi = useMarketApi<BlackDesertItemType[]>(
      HttpMethod.GET,
      `/item/${id}`,
      {
        region: preferencesStore.getRegion,
        language: preferencesStore.getLanguage,
      },
      {
        [HttpHeader.CACHE_CONTROL]: 'stale-if-error',
      },
    );

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch item type list from market API');
    }

    if (response.data.value) {
      return response.data.value.data;
    }

    return [];
  };

  const fetchBaseType = async (): Promise<BlackDesertItemType | null> => {
    const marketApi = useMarketApi<BlackDesertItemType[]>(HttpMethod.GET, `/item/${id}`, {
      region: preferencesStore.getRegion,
      language: preferencesStore.getLanguage,
    });

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch base item type from market API');
    }

    if (response.data.value) {
      return getFirstElement<BlackDesertItemType>(response.data.value.data);
    }

    return null;
  };

  const fetchByEnhancement = async (enhancement: number): Promise<BlackDesertItemType | null> => {
    const marketApi = useMarketApi<BlackDesertItemType[]>(HttpMethod.GET, `/item/${id}`, {
      region: preferencesStore.getRegion,
      language: preferencesStore.getLanguage,
    });

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch base item type from market API');
    }

    if (response.data.value) {
      const itemType: BlackDesertItemType | undefined = response.data.value.data.find(
        (itemType: BlackDesertItemType): boolean => itemType.enhancement === enhancement,
      );

      if (itemType) {
        return itemType;
      }
    }

    return null;
  };

  return {
    fetch,
    fetchBaseType,
    fetchByEnhancement,
  };
}
