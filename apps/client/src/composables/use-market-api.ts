import { StrictUseAxiosReturn, useAxios } from '@vueuse/integrations/useAxios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MarketApiResponse } from '@/interfaces/market-api-response';
import { HttpMethod } from '@/enums/http';
import { useAxiosInstance } from '@/composables/use-axios-instance';
import { UseConfigReturn, useConfig } from '@/composables/use-config';

export function useMarketApi<T>(
  method: HttpMethod,
  url: string,
  params?: Record<string, any>,
): StrictUseAxiosReturn<MarketApiResponse<T>, AxiosResponse<MarketApiResponse<T>>, any> {
  const config: UseConfigReturn = useConfig();
  const axiosInstance: AxiosInstance = useAxiosInstance();

  const axiosConfig: AxiosRequestConfig = {
    method: method,
    baseURL: config.marketApiUrl,
    params: params,
  };

  /**
   * These parameters may have typings imported from different node_modules than VueUse
   * That may throw TypeScript TypeErrors so its more secure to cast it into any
   */
  return useAxios(url, axiosConfig as any, axiosInstance as any);
}
