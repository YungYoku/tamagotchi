const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getAmountOfDaysFromYearStart() {
  let days = 0;
  for (let i = 0; i < new Date().getMonth(); i++) {
    days += months[i];
  }
  return days;
}

export function getAmountOfHoursFromYearStart() {
  return getAmountOfDaysFromYearStart() * 24 + new Date().getUTCHours();
}

export function getRegDate() {
  return getAmountOfHoursFromYearStart();
}
