import { MarketCategoriesConfig, MarketEnhancementConfig } from '@/interfaces/market-config';
import marketCategoriesConfig from '@/configs/market-categories.config';
import marketEnhancementConfig from '@/configs/market-enhancement.config';

interface MockProvide {
  marketCategoriesConfig: MarketCategoriesConfig;
  marketEnhancementConfig: MarketEnhancementConfig;
}

export function mockProvide(): MockProvide {
  return {
    marketCategoriesConfig: marketCategoriesConfig,
    marketEnhancementConfig: marketEnhancementConfig,
  };
}
