const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getDayAndDate = (date) => {
  let str = `${monthsOfYear[date.month()]}  ${date.date()}-${date.year()}`;
  return str;
};

export default getDayAndDate;
