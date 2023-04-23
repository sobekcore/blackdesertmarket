import { I18nContext, I18nService } from 'nestjs-i18n';
import { LanguageCode } from '@/enums/language.enum';

export function mockI18nContext(i18nService: I18nService): I18nContext {
  return new I18nContext(LanguageCode.ENGLISH, i18nService);
}
