import { ListFilterButtonSearchState, ListFilterButtonSortState } from '@/enums/list-filter';

export interface ListFilterData {
  search: string;
  searchContext: ListFilterButtonSearchState;
  sortCount: ListFilterButtonSortState;
  sortPrice: ListFilterButtonSortState;
  sortGrade: ListFilterButtonSortState;
}
