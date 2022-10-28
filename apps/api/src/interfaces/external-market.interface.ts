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

export interface ExternalMarketItemType extends ExternalMarketItemTypeUnused {
  mainKey: number;
  name: string;
  count: number;
  grade: number;
  pricePerOne: number;
  subKey: number;
}

interface ExternalMarketItemTypeUnused {
  chooseKey: number;
  keyType: number;
  mainCategory: number;
  subCategory: number;
  totalTradeCount: number;
}

export interface ExternalMarketItemQueue extends ExternalMarketItemQueueUnused {
  mainKey: number;
  name: string;
  count: number;
  grade: number;
  _pricePerOne: number;
  subKey: number;
  _waitEndTime: number;
}

interface ExternalMarketItemQueueUnused {
  chooseKey: number;
  keyType: number;
  mainCategory: number;
  subCategory: number;
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
