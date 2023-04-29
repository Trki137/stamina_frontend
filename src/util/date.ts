import dayjs, { Dayjs } from "dayjs";

const TOTAL_NUM_OF_DAYS_IN_WEEK = 7;
export const monthNames = [
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

export const getCurrentWeekSpan = () => {
  const today = Date.now();
  let dayInWeek = dayjs(today).day();

  if (dayInWeek === 0) dayInWeek = 7;

  const firstDateInWeek = dayjs(today)
    .subtract(dayInWeek - 1, "days")
    .format("DD.MM.YYYY");

  const lastDateInWeek = dayjs(today)
    .add(TOTAL_NUM_OF_DAYS_IN_WEEK - dayInWeek, "days")
    .format("DD.MM.YYYY");

  return `${firstDateInWeek} - ${lastDateInWeek}`;
};
export const getCurrentDate = () => {
  return dayjs(Date.now()).format("DD.MM.YYYY");
};
export const getCurrentMonthSpan = (date = new Date()) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return `${dayjs(firstDay).format("DD.MM.YYYY")} - ${dayjs(lastDay).format(
    "DD.MM.YYYY"
  )}`;
};

export const dateAdd = (date: Dayjs, intervalType: string) => {
  switch (intervalType) {
    case "DAY": {
      return date.add(1, "days").format("DD.MM.YYYY");
    }
    case "WEEK": {
      return spanAdd(date, 1, 7);
    }
    case "MONTH": {
      return getCurrentMonthSpan(date.add(1, "month").toDate());
    }
    case "YEAR": {
      return getYearSpan(date.add(1, "year").toDate());
    }
    default:
      return date.format("DD.MM.YYYY");
  }
};

export const dateSubtract = (date: Dayjs, intervalType: string) => {
  switch (intervalType) {
    case "DAY": {
      return date.subtract(1, "days").format("DD.MM.YYYY");
    }
    case "WEEK": {
      return spanSubtract(date, 1, 7);
    }
    case "MONTH": {
      return getCurrentMonthSpan(date.subtract(1, "month").toDate());
    }
    case "YEAR": {
      return getYearSpan(date.subtract(1, "year").toDate());
    }
    default:
      return date.format("DD.MM.YYYY");
  }
};

export const getYearSpan = (date: Date = new Date()) => {
  const year = dayjs(date).year();

  const firstDateOfYear = new Date();
  firstDateOfYear.setFullYear(year, 0, 1);

  const lastDateOfYear = new Date();
  lastDateOfYear.setFullYear(year, 11, 31);
  return `${dayjs(firstDateOfYear).format("DD.MM.YYYY")} - ${dayjs(
    lastDateOfYear
  ).format("DD.MM.YYYY")}`;
};

const spanAdd = (date: Dayjs, minValue: number, maxValue: number) => {
  const firstDateInWeek = date.add(minValue, "days").format("DD.MM.YYYY");
  const lastDateInWeek = date.add(maxValue, "days").format("DD.MM.YYYY");
  return `${firstDateInWeek} - ${lastDateInWeek}`;
};

const spanSubtract = (date: Dayjs, minValue: number, maxValue: number) => {
  const firstDateInWeek = date.subtract(maxValue, "days").format("DD.MM.YYYY");
  const lastDateInWeek = date.subtract(minValue, "days").format("DD.MM.YYYY");
  return `${firstDateInWeek} - ${lastDateInWeek}`;
};

export const getMonth = (date: string) => {
  const month = Number(date.split(".")[1]);
  return monthNames[month - 1];
};

export const getYear = (date: string) => {
  let year = date.split(".")[2];

  return year.substring(0, year.indexOf(" "));
};
