import { BlackDesertItem } from './black-desert-item';

export interface BlackDesertItemType extends BlackDesertItem {
  mainCategory: number;
  subCategory: number;
  enhancement: number;
  tradeCount: number;
}

export interface BlackDesertItemHot extends BlackDesertItemType {
  fluctuationType: number;
  fluctuationPrice: number;
}

export interface BlackDesertItemQueue extends BlackDesertItemType {
  endTime: number;
}
