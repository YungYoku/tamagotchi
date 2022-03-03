const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getCurrentDate() {
  return (
    new Date().getUTCFullYear() +
    "." +
    (new Date().getUTCMonth() + 1) +
    "." +
    new Date().getUTCDate() +
    "." +
    new Date().getUTCHours() +
    "." +
    new Date().getUTCMinutes() +
    "." +
    new Date().getUTCSeconds()
  );
}

export function getAmountOfDaysFromYearStart() {
  let days = 0;
  for (let i = 0; i < new Date().getMonth(); i++) {
    days += months[i];
  }
  days += new Date().getDate();
  return days;
}

export function getAmountOfHoursFromYearStart() {
  return getAmountOfDaysFromYearStart() * 24 + new Date().getUTCHours();
}
