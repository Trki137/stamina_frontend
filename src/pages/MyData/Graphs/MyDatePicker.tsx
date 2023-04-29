import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { dateAdd, dateSubtract, getMonth, getYear } from "../../../util/date";
import dayjs from "dayjs";

type MyDatePickerType = {
  date: string;
  intervalType: string;
  setDate: Dispatch<SetStateAction<string>>;
};

export default function MyDatePicker({
  date,
  setDate,
  intervalType,
}: MyDatePickerType) {
  const handleDateUp = () => {
    setDate((prevWeekSpan) => {
      const [day, month, year] = prevWeekSpan
        .substring(
          prevWeekSpan.indexOf(" - ") !== -1
            ? prevWeekSpan.indexOf(" - ") + 2
            : 0
        )
        .trim()
        .split(".");

      const formatted = `${year}-${month}-${day}`;
      return dateAdd(dayjs(Date.parse(formatted)), intervalType);
    });
  };

  const handleDateDown = () => {
    setDate((prevWeekSpan) => {
      const [day, month, year] = prevWeekSpan
        .substring(
          0,
          prevWeekSpan.indexOf(" - ") !== -1
            ? prevWeekSpan.indexOf(" - ")
            : prevWeekSpan.length
        )
        .trim()
        .split(".");
      const formatted = `${year}-${month}-${day}`;
      return dateSubtract(dayjs(Date.parse(formatted)), intervalType);
    });
  };

  return (
    <React.Fragment>
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="px-3 cursor-pointer"
        onClick={() => handleDateDown()}
      />
      <p>{intervalType === "MONTH" && getMonth(date)}</p>
      <p>{intervalType === "YEAR" && getYear(date)}</p>
      <p>{(intervalType === "DAY" || intervalType === "WEEK") && date}</p>
      <FontAwesomeIcon
        icon={faChevronRight}
        className="px-3 cursor-pointer"
        onClick={() => handleDateUp()}
      />
    </React.Fragment>
  );
}
