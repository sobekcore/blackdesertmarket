export interface BlackDesertItemDetails {
  availability: BlackDesertItemDetailsAvailability[],
  history: BlackDesertItemDetailsHistory[],
  basePrice: number;
  sellCount: number;
}

export interface BlackDesertItemDetailsExtended extends BlackDesertItemDetails {
  recentPrice: number;
  recentTransaction: number;
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
