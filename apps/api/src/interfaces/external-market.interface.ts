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
