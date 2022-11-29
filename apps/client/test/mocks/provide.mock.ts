import marketCategoriesConfig from '@/configs/market-categories.config';
import marketEnhancementConfig from '@/configs/market-enhancement.config';

export function mockProvide() {
  return {
    marketCategoriesConfig: marketCategoriesConfig,
    marketEnhancementConfig: marketEnhancementConfig,
  };
}
