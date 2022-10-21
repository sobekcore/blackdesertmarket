import { AxiosResponse } from 'axios';
import { StrictUseAxiosReturn, useAxios } from '@vueuse/integrations/useAxios';
import { MarketApiResponse } from '@/interfaces/market-api-response';
import { HttpMethod } from '@/enums/http';

export function useMarketApi<T>(
  method: HttpMethod,
  url: string,
  params: Record<string, any>,
): StrictUseAxiosReturn<MarketApiResponse<T>, AxiosResponse<MarketApiResponse<T>>, any> {
  return useAxios(url, {
    method: method,
    baseURL: process.env.VUE_APP_API_URL,
    params: params,
  });
}
