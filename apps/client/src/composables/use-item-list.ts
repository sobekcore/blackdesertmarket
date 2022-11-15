import { usePreferencesStore } from '@/stores/preferences';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { useMarketApi } from '@/composables/use-market-api';
import { HttpMethod } from '@/enums/http';
import { ComposableException } from '@/exceptions/composable-exception';

export interface UseItemTypeListReturn {
  fetch(): Promise<BlackDesertItemType[]>;
  fetchBaseType(): Promise<BlackDesertItemType | null>;
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

  return {
    fetch,
    fetchBaseType,
  };
}
