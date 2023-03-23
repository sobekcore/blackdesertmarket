import { StrictUseAxiosReturn, useAxios } from '@vueuse/integrations/useAxios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MarketApiResponse } from '@/interfaces/market-api-response';
import { HttpMethod } from '@/enums/http';
import { useAxiosInstance } from '@/composables/use-axios-instance';
import { config } from '@/config';

export function useMarketApi<T>(
  method: HttpMethod,
  url: string,
  params?: Record<string, any>,
): StrictUseAxiosReturn<MarketApiResponse<T>, AxiosResponse<MarketApiResponse<T>>, any> {
  const axiosInstance: AxiosInstance = useAxiosInstance();

  const axiosConfig: AxiosRequestConfig = {
    method: method,
    baseURL: config.marketApiUrl,
    params: params,
  };

  return useAxios(url, axiosConfig, axiosInstance, { immediate: false });
}
