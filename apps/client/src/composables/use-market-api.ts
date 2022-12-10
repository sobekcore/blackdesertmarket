import { StrictUseAxiosReturn, useAxios } from '@vueuse/integrations/useAxios';
import { AxiosResponse } from 'axios';
import { MarketApiResponse } from '@/interfaces/market-api-response';
import { HttpMethod } from '@/enums/http';
import { UseConfigReturn, useConfig } from '@/composables/use-config';

export function useMarketApi<T>(
  method: HttpMethod,
  url: string,
  params?: Record<string, any>,
): StrictUseAxiosReturn<MarketApiResponse<T>, AxiosResponse<MarketApiResponse<T>>, any> {
  const config: UseConfigReturn = useConfig();

  return useAxios(url, {
    method: method,
    baseURL: config.marketApiUrl,
    params: params,
  });
}
