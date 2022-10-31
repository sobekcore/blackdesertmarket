export interface MarketCategoriesConfig {
  categories: MarketCategoriesConfigCategory[];
}

export interface MarketCategoriesConfigCategory {
  title: string;
  icon: string;
  mainCategory: number;
  subCategories: MarketCategoriesConfigSubCategory[];
}

export interface MarketCategoriesConfigSubCategory {
  title: string;
  subCategory: number;
}

export interface MarketEnhancementConfig {
  feverEnhancementLevels: MarketEnhancementConfigFeverEnhancementLevel[];
}

export interface MarketEnhancementConfigFeverEnhancementLevel {
  mainCategory: number;
  items: number[];
}
