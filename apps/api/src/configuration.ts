import { ConfigFactory } from '@nestjs/config';

/**
 * Environment files with lower array index are treated with higher priority
 * If file does not exist it is omitted and the first one which exists is chosen
 */
export const files: string[] = ['.env.local', '.env'];

export const configuration: ConfigFactory = (): Record<string, any> => ({
  useCache: (process.env.USE_CACHE && process.env.USE_CACHE === 'true') || false,

  defaultRequestRegion: process.env.DEFAULT_REQUEST_REGION || 'eu',
  defaultRequestLanguage: process.env.DEFAULT_REQUEST_LANGUAGE || 'en-US',

  paramsRequestToken: process.env.PARAMS_REQUEST_TOKEN,
  cookieRequestToken: process.env.COOKIE_REQUEST_TOKEN,
});
