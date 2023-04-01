import { ListFilterButtonState } from '@/enums/list-filter';

export interface ListFilterData {
  search: string;
  sortCount: ListFilterButtonState;
  sortPrice: ListFilterButtonState;
  sortGrade: ListFilterButtonState;
}
