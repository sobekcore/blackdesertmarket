export interface BlackDesertItem {
  id: number;
  name: string;
  count: number;
  grade: number;
  basePrice: number;
}

export interface BlackDesertItemType extends BlackDesertItem {
  enhancement: number;
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
