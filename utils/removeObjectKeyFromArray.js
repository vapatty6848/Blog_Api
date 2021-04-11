function removeObjectKeyFromArray(array, keyToRemove) {
  return array.map((element) => {
    const { [keyToRemove]: deletedKey, ...otherKeys } = element;
    return otherKeys;
  });
}

module.exports = removeObjectKeyFromArray;
