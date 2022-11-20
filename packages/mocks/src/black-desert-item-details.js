export function mockBlackDesertItemDetails() {
  return {
    availability: [mockBlackDesertItemDetailsAvailability()],
    history: [mockBlackDesertItemDetailsHistory()],
    basePrice: 3000,
  }
}

export function mockBlackDesertItemDetailsAvailability() {
  return {
    sellCount: 1000,
    buyCount: 0,
    onePrice: 3000,
  }
}

export function mockBlackDesertItemDetailsHistory() {
  return {
    date: '2022-10-22',
    onePrice: 3000,
  }
}
