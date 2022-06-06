export const unicodeRegExpTransformer = text =>
  new RegExp(
    text
      .split('')
      .map(char => `\\u{${char.charCodeAt(0).toString(16)}}`)
      .join('.*'),
    'u',
  );

export const CONFIG = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const API_BASE_URL = 'https://232d-149-62-208-39.eu.ngrok.io';

//TODO
export const calculateTotalPrice = items => {
  return items
    .map(item => item.plant.price * item.quantity)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);
};
