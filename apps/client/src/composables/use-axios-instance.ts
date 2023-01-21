import axios, { AxiosError, AxiosInstance } from 'axios';
import { MarketApiResponse } from '@/interfaces/market-api-response';
import { MarketApiCode } from '@/enums/market-api-code';
import { useMarketStore } from '@/stores/market';

export function useAxiosInstance(): AxiosInstance {
  const axiosInstance: AxiosInstance = axios.create();

  axiosInstance.interceptors.response.use(undefined, (error: AxiosError<MarketApiResponse<unknown>>): void => {
    const marketStore = useMarketStore();
    const code: string | undefined = error.response?.data?.code;

    if (code === MarketApiCode.MAINTENANCE) {
      marketStore.maintenance = true;
    }
  });

  return axiosInstance;
}
