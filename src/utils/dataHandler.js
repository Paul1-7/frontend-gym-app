import { format } from 'date-fns';
import { differenceInMinutes } from 'date-fns';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const objectByString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '?.$1'); // convert indexes to properties
  s = s.replace(/^\./, ''); // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (typeof o === 'undefined') return null;
    if (k in o) {
      o = o[k];
    } else {
      return null;
    }
  }
  return o;
};

const getBOBCurrency = (value) => new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(value);

export function generateColorFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = (hash & 0x00ffffff).toString(16).toUpperCase();

  while (color.length < 6) {
    color = '0' + color;
  }

  return '#' + color;
}

export const getDateLocale = (date) => {
  return new Date(date).toLocaleDateString();
};

export function getTimeDifferenceWithFormat(date1, date2) {
  const minutesDifference = differenceInMinutes(date2, date1);

  const hours = Math.floor(minutesDifference / 60);
  const minutes = minutesDifference % 60;

  return format(new Date().setHours(hours, minutes), 'HH:mm');
}

export const getDateTimeFormat = (value) => {
  const format = new Intl.DateTimeFormat('es-BO', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
  const date = new Date(value);
  return format.format(date);
};

export { objectByString, getBOBCurrency };
