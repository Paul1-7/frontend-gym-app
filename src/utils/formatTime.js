import { differenceInCalendarDays } from 'date-fns';
import { parseISO } from 'date-fns';
import { format, formatDistanceToNow } from 'date-fns';

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function toISOStringWithoutTZ(date) {
  if (date instanceof Date) {
    return date.toISOString().slice(0, -1);
  }

  return new Date(date).toISOString().slice(0, -1);
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function fTime(date) {
  return format(new Date(date), 'HH:mm');
}
export function daysElapsedFromNow(startDate, dateNow = new Date()) {
  if (startDate instanceof Date) {
    return differenceInCalendarDays(startDate, dateNow);
  }

  const parsedStartDate = parseISO(startDate);
  const differenceInDaysValue = differenceInCalendarDays(parsedStartDate, dateNow);

  return differenceInDaysValue;
}
