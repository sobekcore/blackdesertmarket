export enum ExternalMarketEndpoint {
  LIST = 'GetWorldMarketList',
  LIST_HOT = 'GetWorldMarketHotList',
  LIST_QUEUE = 'GetWorldMarketWaitList',
  ITEM = 'GetWorldMarketSubList',
  ITEM_DETAILS = 'GetItemSellBuyInfo',
}

export enum ExternalMarketRequestPath {
  MAINTENANCE = '/Maintenance/WebMaintanace',
}

export enum ExternalMarketLanguageCode {
  ENGLISH = 'en-US',
  SPANISH = 'es-ES',
}
