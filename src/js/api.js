const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getAmountOfHoursFromYearStart() {
  let days = 0;
  for (let i = 0; i < new Date().getMonth(); i++) {
    days += months[i];
  }

  return days * 24 + new Date().getUTCHours();
}

export function getRegDate() {
  return getAmountOfHoursFromYearStart();
}
