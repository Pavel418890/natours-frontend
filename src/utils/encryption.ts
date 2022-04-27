import { AES as CryptoJS, enc as encode } from "crypto-js";

const secretKey = "Im-lumberjack-and-im-ok.I sleep-all-night-and-work-all-day.";

export const setLocalStorageEncryptedItem = function (
  key: string,
  obj: object | null
) {
  const encryptedObj = CryptoJS.encrypt(
    JSON.stringify(obj),
    secretKey
  ).toString();
  localStorage.setItem(key, encryptedObj);
};

export const getLocalStorageDecryptedItem = function (key: string) {
  try {
    const localStorageItem = localStorage.getItem(key) as string;
    const bytes = CryptoJS.decrypt(localStorageItem, secretKey);
    return JSON.parse(bytes.toString(encode.Utf8));
  } catch (e) {
    localStorage.removeItem(key);
    // return undefined;
  }
};
