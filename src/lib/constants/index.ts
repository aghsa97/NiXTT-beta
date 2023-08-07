export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// format the time string in create task form as "HH:MM"
export const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// format the dueString to DB as "DD MMM, HH:MM" or "DD MMM, DDD"
export const DUE_STRING_REGEX =
  /^(\d{2} [a-zA-Z]{3}, \d{2}:\d{2})|(\d{2} [a-zA-Z]{3}, [a-zA-Z]{3})$/;

// format the date string in create task form to ISO string
export const DATE_REGEX =
  /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?$/;
