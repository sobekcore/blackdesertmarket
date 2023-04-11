import axios, { AxiosError, AxiosInstance } from 'axios';
import { MarketApiResponse } from '@/interfaces/market-api-response';
import { MarketApiCode } from '@/enums/market-api-code';
import { useLocationStore } from '@/stores/location';

export function useAxiosInstance(): AxiosInstance {
  const axiosInstance: AxiosInstance = axios.create();

  axiosInstance.interceptors.response.use(undefined, (error: AxiosError<MarketApiResponse<unknown>>): void => {
    const locationStore = useLocationStore();
    const code: string | undefined = error.response?.data?.code;

    if (code === MarketApiCode.MAINTENANCE) {
      locationStore.maintenance = true;
    }
  });

  return axiosInstance;
}
