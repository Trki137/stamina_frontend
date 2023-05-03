import React, { ChangeEvent, useState } from "react";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProfileButton from "../../components/Button/ProfileButton";
import SuccessMsg from "../../components/Messages/SuccessMsg";
import ErrorMessage from "../../components/Messages/ErrorMessage";

export default function HandInput() {
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "sport",
      label: "Sport",
      value: "",
      type: "text",
    },
    {
      name: "calories",
      label: "Calories",
      value: "",
      type: "text",
    },
    {
      name: "hearthRate",
      label: "Average hearth rate",
      value: "",
      type: "text",
    },
  ]);

  const [time, setTime] = useState<userInputType[]>([
    {
      name: "min",
      label: "Minutes",
      value: "",
      type: "number",
    },
    {
      name: "seconds",
      label: "Seconds",
      value: "0",
      type: "number",
    },
  ]);

  const [date, setDate] = useState<Date>(new Date());
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInput((prevUserInput) => {
      const newUserInput = [...prevUserInput];
      const index = newUserInput.findIndex((input) => input.name === name);
      newUserInput[index].value = value;
      return newUserInput;
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setDate(date);
  };

  const saveData = () => {};

  return (
    <div className="w-1/2 lg:w-1/3 mx-auto mt-2 ">
      <SuccessMsg
        hide={hide}
        showSuccess={showSuccess}
        successMsg={"Data saved successfully"}
      />
      {errorMsg && <ErrorMessage error={errorMsg} />}
      <div className="text-left mt-5">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={handleDateChange}
            value={date}
            renderInput={(props) => <TextField {...props} error={false} />}
            label={"Date"}
          />
        </LocalizationProvider>
      </div>
      <div className="mt-3 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-3">
        {userInput.map((input) => (
          <Input
            key={input.name}
            inputInfo={input}
            handleChange={handleChange}
            error={null}
          />
        ))}
      </div>
      <div className="mt-3 w-full mx-auto grid grid-cols-2 gap-x-3">
        {time.map((input) => (
          <Input
            key={input.name}
            inputInfo={input}
            handleChange={handleChange}
            error={null}
          />
        ))}
      </div>
      <ProfileButton text={"Save"} handleClick={saveData} />
    </div>
  );
}
