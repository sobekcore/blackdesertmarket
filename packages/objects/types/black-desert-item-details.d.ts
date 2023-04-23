import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsExtended,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemDetailsHistory,
} from '@blackdesertmarket/interfaces';

export function isValidBlackDesertItemDetails(itemDetails: unknown): itemDetails is BlackDesertItemDetails;

export function isValidBlackDesertItemDetailsExtended(itemDetails: unknown): itemDetails is BlackDesertItemDetailsExtended;

export function isValidBlackDesertItemDetailsAvailability(itemAvailability: unknown): itemAvailability is BlackDesertItemDetailsAvailability;

export function isValidBlackDesertItemDetailsHistory(itemHistory: unknown): itemHistory is BlackDesertItemDetailsHistory;
