import {
  setLocalStorageEncryptedItem,
  getLocalStorageDecryptedItem,
} from './encryption';

export const loadState = (...keys: any[]) => {
  const requiredKeys = [...keys];

  try {
    let decryptedObject = {};
    requiredKeys.forEach((key) => {
      const decryptedValue = getLocalStorageDecryptedItem(key);
      decryptedObject = Object.assign({
        ...decryptedObject,
        [key]: decryptedValue,
      });
    });
    return decryptedObject;
  } catch (e) {
    return undefined;
  }
};
