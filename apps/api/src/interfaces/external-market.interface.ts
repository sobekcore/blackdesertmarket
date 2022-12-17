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
  mainCategory: number;
  subCategory: number;
  chooseKey: number;
  totalTradeCount: number;
}

interface ExternalMarketItemTypeUnused {
  keyType?: number;
  subKey?: number;
}

export interface ExternalMarketItemHot extends ExternalMarketItemHotUnused {
  mainKey: number;
  name: string;
  count: number;
  grade: number;
  pricePerOne: number;
  mainCategory: number;
  subCategory: number;
  chooseKey: number;
  totalTradeCount: number;
  fluctuationType: number;
  fluctuationPrice: number;
}

interface ExternalMarketItemHotUnused {
  keyType?: number;
  subKey?: number;
  subtype?: number;
}

export interface ExternalMarketItemQueue extends ExternalMarketItemQueueUnused {
  mainKey: number;
  name: string;
  count: number;
  grade: number;
  _pricePerOne: number;
  mainCategory: number;
  subCategory: number;
  chooseKey: number;
  totalTradeCount: number;
  _waitEndTime: number;
}

interface ExternalMarketItemQueueUnused {
  keyType?: number;
  subKey?: number;
}

export interface ExternalMarketItemDetails extends ExternalMarketItemDetailsUnused {
  marketConditionList: ExternalMarketItemDetailsAvailability[];
  resultMsg: string;
  basePrice: number;
  biddingSellCount: number;
}

interface ExternalMarketItemDetailsUnused {
  priceList?: number[];
  enchantGroup?: number;
  enchantMaxGroup?: number;
  enchantMaterialKey?: number;
  enchantMaterialPrice?: number;
  enchantNeedCount?: number;
  maxRegisterForWorldMarket?: number;
  sellCountForWorldMarket?: number;
  addBuyRefCountForWorldMarket?: number;
  addBuyCountForWorldMarket?: number;
  countValue?: number;
  sellMaxCount?: number;
  buyMaxCount?: number;
  isWaitItem?: boolean;
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
