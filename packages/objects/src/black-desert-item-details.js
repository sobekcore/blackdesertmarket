export function isValidBlackDesertItemDetails(itemDetails) {
  return (
    itemDetails &&
    itemDetails.hasOwnProperty('availability') &&
    itemDetails.hasOwnProperty('history') &&
    itemDetails.hasOwnProperty('basePrice')
  );
}

export function isValidBlackDesertItemDetailsAvailability(itemAvailability) {
  return (
    itemAvailability &&
    itemAvailability.hasOwnProperty('sellCount') &&
    itemAvailability.hasOwnProperty('buyCount') &&
    itemAvailability.hasOwnProperty('onePrice')
  );
}

export function isValidBlackDesertItemDetailsHistory(itemHistory) {
  return (
    itemHistory &&
    itemHistory.hasOwnProperty('date') &&
    itemHistory.hasOwnProperty('onePrice')
  );
}
