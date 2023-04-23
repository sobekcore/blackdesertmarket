import { Ref } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonSearchState, ListFilterButtonSortState } from '@/enums/list-filter';
import { UseItemSearchFetchReturn, useItemSearchFetch } from '@/composables/item-search/use-item-search-fetch';

interface ProcessItemListParams {
  itemList: Ref<BlackDesertItem[]>;
  loaded: Ref<boolean>;

  /**
   * Fallback is a promise launched when we DON'T execute global search
   */
  fallback(): unknown;

  /**
   * Callback is a promise launched when we DO execute global search
   */
  callback?(): unknown;
}

export interface UseListFilterReturn {
  filterItemList(itemList: BlackDesertItem[], listFilter: ListFilterData): BlackDesertItem[];
  sortItemList(itemList: BlackDesertItem[], listFilter: ListFilterData): BlackDesertItem[];
  processItemList(params: ProcessItemListParams): Promise<void>;
}

export function useListFilter(data: ListFilterData): UseListFilterReturn {
  const filterItemList = (itemList: BlackDesertItem[]): BlackDesertItem[] => {
    if (data.search && data.searchContext === ListFilterButtonSearchState.BY_CATEGORY) {
      return itemList.filter((item: BlackDesertItem): boolean => {
        return item.name.toLowerCase().includes(data.search.toLowerCase());
      });
    }

    return itemList;
  };

  /**
   * TODO: Build a better solution to handle filtering with multiple properties at once
   */
  const sortItemList = (itemList: BlackDesertItem[]): BlackDesertItem[] => {
    itemList = Array.from(itemList);

    if (data.sortCount !== ListFilterButtonSortState.DEFAULT) {
      itemList.sort((item: BlackDesertItem, next: BlackDesertItem): number => {
        if (data.sortCount === ListFilterButtonSortState.DESC) {
          return item.count < next.count ? 1 : -1;
        } else if (data.sortCount === ListFilterButtonSortState.ASC) {
          return item.count > next.count ? 1 : -1;
        }

        return 0;
      });
    }

    if (data.sortPrice !== ListFilterButtonSortState.DEFAULT) {
      itemList.sort((item: BlackDesertItem, next: BlackDesertItem): number => {
        if (data.sortPrice === ListFilterButtonSortState.DESC) {
          return item.basePrice < next.basePrice ? 1 : -1;
        } else if (data.sortPrice === ListFilterButtonSortState.ASC) {
          return item.basePrice > next.basePrice ? 1 : -1;
        }

        return 0;
      });
    }

    if (data.sortGrade !== ListFilterButtonSortState.DEFAULT) {
      itemList.sort((item: BlackDesertItem, next: BlackDesertItem): number => {
        if (data.sortGrade === ListFilterButtonSortState.DESC) {
          return item.grade < next.grade ? 1 : -1;
        } else if (data.sortGrade === ListFilterButtonSortState.ASC) {
          return item.grade > next.grade ? 1 : -1;
        }

        return 0;
      });
    }

    return itemList;
  };

  const processItemList = async (params: ProcessItemListParams): Promise<void> => {
    params.loaded.value = false;

    if (data.search && data.searchContext === ListFilterButtonSearchState.ALL) {
      const itemSearchFetch: UseItemSearchFetchReturn = useItemSearchFetch(data.search);

      await itemSearchFetch.fetch().then(async (data: BlackDesertItem[]): Promise<void> => {
        params.itemList.value = data;
        params.loaded.value = true;

        if (params.callback) {
          await params.callback();
        }
      });
    } else {
      await params.fallback();
    }

    params.itemList.value = sortItemList(filterItemList(params.itemList.value));
  };

  return {
    filterItemList,
    sortItemList,
    processItemList,
  };
}
