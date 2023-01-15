export interface ExternalMarketRawItemDetails extends ExternalMarketRawItemDetailsUnused {
  resultMsg: string;
}

interface ExternalMarketRawItemDetailsUnused {
  resultCode?: number;
}

export interface ExternalMarketRawItemDetailsElement {
  [key: string]: string;
}
