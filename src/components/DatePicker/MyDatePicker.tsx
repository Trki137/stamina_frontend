import React, { Dispatch, SetStateAction } from "react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type MyDatePickerType = {
  setStartDate: Dispatch<SetStateAction<Date>>;
  startDate: Date;
};
export default function MyDatePicker({
  setStartDate,
  startDate,
}: MyDatePickerType) {
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );
}
