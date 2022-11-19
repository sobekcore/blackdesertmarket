export function getFirstElement(array) {
  if (!array || !array.length) {
    return null;
  }

  return array.find(() => {
    return true;
  });
}
