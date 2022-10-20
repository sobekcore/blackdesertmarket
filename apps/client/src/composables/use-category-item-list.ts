import { Store, useStore } from 'vuex';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { useMarketApi } from '@/composables/use-market-api';

interface UseCategoryItemListReturn {
  fetchCategoryItemList(mainCategory: number, subCategory: number): Promise<BlackDesertItem[]>;
}

export function useCategoryItemList(): UseCategoryItemListReturn {
  const store: Store<any> = useStore();

  const fetchCategoryItemList = async (mainCategory: number, subCategory: number): Promise<BlackDesertItem[]> => {
    const { execute } = useMarketApi<BlackDesertItem[]>(HttpMethod.GET, `/list/${mainCategory}/${subCategory}`, {
      region: store.getters['preferences/region'],
      language: store.getters['preferences/language'],
    });

    const { data, error } = await execute();

    if (error.value) {
      throw new ComposableException('Could not fetch category item list from market API');
    }

    if (data.value) {
      return data.value.data;
    }

    return [];
  };

  return {
    fetchCategoryItemList,
  };
}
