export interface ExternalMarketParams {
  [key: string]: string;
}

export interface ExternalMarketMeta {
  region?: string;
  language?: string;
}

export interface ExternalMarketItem {
  mainKey: number;
  name: string;
  sumCount: number;
  grade: number;
  minPrice: number;
}

export interface ExternalMarketItemDetails extends ExternalMarketItemDetailsUnused {
  marketConditionList: ExternalMarketItemDetailsAvailability[];
  resultMsg: string;
  basePrice: number;
}

interface ExternalMarketItemDetailsUnused {
  priceList: number[];
  enchantGroup: number;
  enchantMaxGroup: number;
  enchantMaterialKey: number;
  enchantMaterialPrice: number;
  enchantNeedCount: number;
  maxRegisterForWorldMarket: number;
  sellCountForWorldMarket: number;
  addBuyRefCountForWorldMarket: number;
  addBuyCountForWorldMarket: number;
  biddingSellCount: number;
  countValue: number;
  sellMaxCount: number;
  buyMaxCount: number;
  isWaitItem: boolean;
}

export interface ExternalMarketItemDetailsAvailability {
  sellCount: number;
  buyCount: number;
  pricePerOne: number;
}

export interface ExternalMarketItemDetailsHistory {
  days: string;
  value: number;
}
