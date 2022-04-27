import React, { ChangeEvent, SetStateAction } from 'react';

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const utils = (r: number, g: number, b: number): string =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export function calculateRemainingTime(expirationTime: number) {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  return adjustedExpirationTime - currentTime;
}

export function dynamicStyleClassName(
  stylesObject: CSSModuleClasses,
  rawClassName: string,
  index: number | string,
  [...optionClasses]: string[]
) {
  const className = `${rawClassName}${index}`;
  const optionClassesArray = optionClasses.map(
    (optionClassName) => `${stylesObject[optionClassName]}`
  );
  return `${optionClassesArray.join(' ')} ${stylesObject[className]}`;
}

export const formChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  setFormAction: Function
) =>
  setFormAction((prevState: {}) => ({
    ...prevState,
    [event.target.name]: event.target.value,
  }));
