import { LanguageCode } from '@/enums/language';
import { RegionCode } from '@/enums/region';

export interface Config {
  marketApiUrl: string;
  defaultRegion: string;
  defaultLanguage: string;
}

export const config: Config = {
  marketApiUrl: process.env.VUE_APP_MARKET_API_URL,
  defaultRegion: process.env.VUE_APP_DEFAULT_REGION || RegionCode.EUROPE,
  defaultLanguage: process.env.VUE_APP_DEFAULT_LANGUAGE || LanguageCode.ENGLISH,
};
