export interface BlackDesertItem {
  id: number;
  name: string;
  count: number;
  grade: number;
  basePrice: number;
}

export interface BlackDesertItemType extends BlackDesertItem {
  mainCategory: number;
  subCategory: number;
  enhancement: number;
}

export interface BlackDesertItemHot extends BlackDesertItemType {
  fluctuationType: number;
  fluctuationPrice: number;
}

export interface BlackDesertItemQueue extends BlackDesertItemType {
  endTime: number;
}

export interface BlackDesertItemDetails {
  availability: BlackDesertItemDetailsAvailability[],
  history: BlackDesertItemDetailsHistory[],
  basePrice: number;
}

export interface BlackDesertItemDetailsAvailability {
  sellCount: number;
  buyCount: number;
  onePrice: number;
}

export interface BlackDesertItemDetailsHistory {
  date: string;
  onePrice: number;
}
