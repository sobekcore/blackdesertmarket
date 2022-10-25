import { Store, useStore } from 'vuex';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { useMarketApi } from '@/composables/use-market-api';

interface UseCategoryItemListReturn {
  fetchHotItemList(): Promise<BlackDesertItemType[]>;
}

export function useHotItemList(): UseCategoryItemListReturn {
  const store: Store<any> = useStore();

  const fetchHotItemList = async (): Promise<BlackDesertItemType[]> => {
    const { execute } = useMarketApi<BlackDesertItemType[]>(HttpMethod.GET, `/list/hot`, {
      region: store.getters['preferences/region'],
      language: store.getters['preferences/language'],
    });

    const { data, error } = await execute();

    if (error.value) {
      throw new ComposableException('Could not fetch hot item list from market API');
    }

    if (data.value) {
      return data.value.data;
    }

    return [];
  };

  return {
    fetchHotItemList,
  };
}
