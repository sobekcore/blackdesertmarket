import marketCategoriesConfig from '@/configs/market-categories.config';
import marketEnhancementConfig from '@/configs/market-enhancement.config';
import { MarketCategoriesConfigKey, MarketEnhancementConfigKey, TranslateKey } from '@/composables/use-inject';

export function mockProvide(): Record<symbol, unknown> {
  return {
    [TranslateKey as symbol]: (key: string) => key,
    [MarketCategoriesConfigKey as symbol]: marketCategoriesConfig,
    [MarketEnhancementConfigKey as symbol]: marketEnhancementConfig,
  };
}
