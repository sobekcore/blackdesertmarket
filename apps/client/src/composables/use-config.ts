export interface UseConfigReturn {
  marketApiUrl?: string;
}

export function useConfig(): UseConfigReturn {
  return {
    marketApiUrl: process.env.VUE_APP_MARKET_API_URL,
  };
}
