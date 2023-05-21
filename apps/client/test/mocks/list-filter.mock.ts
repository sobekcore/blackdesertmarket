import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonSearchState, ListFilterButtonSortState } from '@/enums/list-filter';

export function mockListFilterData(): ListFilterData {
  return {
    search: 'Mock Search',
    searchContext: ListFilterButtonSearchState.ALL,
    sortCount: ListFilterButtonSortState.DEFAULT,
    sortPrice: ListFilterButtonSortState.DEFAULT,
    sortGrade: ListFilterButtonSortState.DEFAULT,
  };
}
