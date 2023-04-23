import { ConfigFactory } from '@nestjs/config';
import { LanguageCode } from '@/enums/language.enum';
import { RegionCode } from '@/enums/region.enum';

/**
 * Environment files with lower array index are treated with higher priority
 * If file does not exist it is omitted and the first one which exists is chosen
 */
export const files: string[] = ['.env.local', '.env'];

export const config: ConfigFactory = () => ({
  useCache: (process.env.USE_CACHE && process.env.USE_CACHE === 'true') || false,

  defaultRequestRegion: process.env.DEFAULT_REQUEST_REGION || RegionCode.EUROPE,
  defaultRequestLanguage: process.env.DEFAULT_REQUEST_LANGUAGE || LanguageCode.ENGLISH,

  paramsRequestToken: process.env.PARAMS_REQUEST_TOKEN,
  cookieRequestToken: process.env.COOKIE_REQUEST_TOKEN,
});
