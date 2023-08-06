import { ComposableException } from '@/exceptions/composable-exception';
import { HttpMethod } from '@/enums/http';
import { useMarketApi } from '@/composables/use-market-api';

export interface UseItemIconFetchReturn {
  fetch(): Promise<string>;
}

export function useItemIconFetch(id: number): UseItemIconFetchReturn {
  const fetch = async (): Promise<string> => {
    const marketApi = useMarketApi<Blob, true>(
      HttpMethod.GET,
      `/item/${id}/icon`,
      {},
      {
        responseType: 'blob',
      },
    );

    const response = await marketApi.execute();

    if (response.error.value) {
      throw new ComposableException('Could not fetch item icon from market API');
    }

    /**
     * In other contexts than browser createObjectURL method might not be available
     */
    if (URL.createObjectURL && response.data.value) {
      return URL.createObjectURL(response.data.value);
    }

    return '';
  };

  return {
    fetch,
  };
}
