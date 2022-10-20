export interface MarketConfig {
  categories: MarketConfigCategory[];
}

export interface MarketConfigCategory {
  title: string;
  icon: string;
  mainCategory: number;
  subCategories: MarketConfigSubCategory[];
}

export interface MarketConfigSubCategory {
  title: string;
  subCategory: number;
}
