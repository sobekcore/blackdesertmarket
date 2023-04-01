import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonState } from '@/enums/list-filter';

export interface UseListFilterReturn {
  sortItemList(itemList: BlackDesertItem[]): void;
}

export function useListFilter(data: ListFilterData): UseListFilterReturn {
  /**
   * TODO: Build a better solution to handle filtering with multiple properties at once
   */
  const sortItemList = (itemList: BlackDesertItem[]): void => {
    itemList.sort((item: BlackDesertItem, next: BlackDesertItem): number => {
      if (data.sortCount === ListFilterButtonState.DESC) {
        return item.count < next.count ? 1 : -1;
      } else if (data.sortCount === ListFilterButtonState.ASC) {
        return item.count > next.count ? 1 : -1;
      }

      return 0;
    });

    itemList.sort((item: BlackDesertItem, next: BlackDesertItem): number => {
      if (data.sortPrice === ListFilterButtonState.DESC) {
        return item.basePrice < next.basePrice ? 1 : -1;
      } else if (data.sortPrice === ListFilterButtonState.ASC) {
        return item.basePrice > next.basePrice ? 1 : -1;
      }

      return 0;
    });

    itemList.sort((item: BlackDesertItem, next: BlackDesertItem): number => {
      if (data.sortGrade === ListFilterButtonState.DESC) {
        return item.grade < next.grade ? 1 : -1;
      } else if (data.sortGrade === ListFilterButtonState.ASC) {
        return item.grade > next.grade ? 1 : -1;
      }

      return 0;
    });
  };

  return {
    sortItemList,
  };
}
