function removeObjectKey(obj, keyToRemove) {
  const { [keyToRemove]: deletedKey, ...otherKeys } = obj;
  return otherKeys;
}

module.exports = removeObjectKey;
