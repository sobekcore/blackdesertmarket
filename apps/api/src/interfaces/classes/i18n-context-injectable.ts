import { I18nContext } from 'nestjs-i18n';

export interface I18nContextInjectable {
  injectI18nContext(i18n: I18nContext): void;
}
