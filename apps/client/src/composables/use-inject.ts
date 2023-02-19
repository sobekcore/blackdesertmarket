import { InjectionKey, inject } from 'vue';
import { ComposerTranslation } from 'vue-i18n';
import { MarketCategoriesConfig, MarketEnhancementConfig } from '@/interfaces/market-config';
import { ComposableException } from '@/exceptions/composable-exception';

export const TranslateKey: InjectionKey<ComposerTranslation> = Symbol('translate');

export const MarketCategoriesConfigKey: InjectionKey<MarketCategoriesConfig> = Symbol('marketCategoriesConfig');

export const MarketEnhancementConfigKey: InjectionKey<MarketEnhancementConfig> = Symbol('marketEnhancementConfig');

export function useInject<T>(injectionKey: InjectionKey<T>): T {
  const dependency: T | undefined = inject(injectionKey);

  if (!dependency) {
    throw new ComposableException(`Could not inject ${injectionKey.description}`);
  }

  return dependency;
}
