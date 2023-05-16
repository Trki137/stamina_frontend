import React, { Dispatch, SetStateAction } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type MyDatePickerType = {
  setStartDate: Dispatch<SetStateAction<Date>>;
  startDate: Date;
  error?: boolean;
};
export default function MyDatePicker({
  setStartDate,
  startDate,
  error,
}: MyDatePickerType) {
  const handleChange = (newValue: Date | null) => {
    if (newValue == null) return;
    setStartDate(new Date(newValue));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} timeZone="Europe/Zagreb">
      <DatePicker
        label="End date"
        value={startDate}
        onChange={(newValue) => handleChange(newValue)}
        renderInput={(props) => <TextField {...props} error={error} />}
      />
    </LocalizationProvider>
  );
}
