import React, { ChangeEvent, useState } from "react";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProfileButton from "../../components/Button/ProfileButton";
import SuccessMsg from "../../components/Messages/SuccessMsg";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import dayjs from "dayjs";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { SaveData } from "../../@types/ExerciseDataTypes";

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
      type: "number",
    },
    {
      name: "hearthRate",
      label: "Average hearth rate",
      value: "",
      type: "number",
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
  const [inputErrors, setInputErrors] = useState<
    {
      inputName: string;
      error: string;
    }[]
  >([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInput((prevUserInput) => {
      const newUserInput = [...prevUserInput];
      const index = newUserInput.findIndex((input) => input.name === name);
      newUserInput[index].value = value;
      return newUserInput;
    });
  };
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTime((prevTimeInput) => {
      const newUserInput = [...prevTimeInput];
      const index = newUserInput.findIndex((input) => input.name === name);
      newUserInput[index].value = value;
      return newUserInput;
    });
  };

  const getError = (name: string) => {
    if (inputErrors.length === 0) return null;

    const index = inputErrors.findIndex((err) => err.inputName === name);
    return index !== -1 ? inputErrors[index].error : null;
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setDate(date);
  };

  const saveData = () => {
    setInputErrors([]);
    const err: {
      inputName: string;
      error: string;
    }[] = [];
    if (userInput[0].value.length === 0) {
      err.push({
        inputName: "sport",
        error: "Sport must be defined",
      });
    }

    if (Number(time[1].value) > 59 || Number(time[1].value) < 0) {
      err.push({
        inputName: "seconds",
        error: "Invalid time",
      });
    }

    if (userInput[1].value.length === 0) {
      err.push({
        inputName: "calories",
        error: "Field empty",
      });
    }

    const calories = userInput[1].value.includes(".")
      ? Number.parseFloat(userInput[1].value)
      : Number.parseInt(userInput[1].value);

    if (Number.isNaN(calories)) {
      err.push({
        inputName: "calories",
        error: "Invalid input",
      });
    }

    if (new Date() < date) {
      err.push({
        inputName: "date",
        error: "Invalid date",
      });
    }

    if (err.length > 0) {
      setInputErrors(err);
      return;
    }

    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const timeInSeconds = Number(time[0].value) * 60 + Number(time[1].value);

    const data: SaveData = {
      name: userInput[0].value,
      date: dayjs(date).format("DD.MM.YYYY"),
      userId: JSON.parse(user).userid,
      trainingId: null,
      time: `${timeInSeconds}`,
      calories,
      avg_hearth_rate: Math.ceil(Number(userInput[2].value)),
    };

    axios
      .post(`${backend_paths.DATA}`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setErrorMsg(null);
        setUserInput((prevUserInput) => {
          const newUserInput = [...prevUserInput];
          newUserInput.forEach((input) => (input.value = ""));
          return newUserInput;
        });

        setDate(new Date());
        setTime((prevTime) => {
          const newTime = [...prevTime];
          newTime[0].value = "";
          newTime[1].value = "0";
          return newTime;
        });

        setHide(false);
        setShowSuccess(true);

        setTimeout(() => setShowSuccess(false), 2000);
        setTimeout(() => setHide(true), 3500);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Couldn't save data. Please try again later.");
      });
  };

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
            renderInput={(props) => (
              <TextField {...props} error={getError("date") !== null} />
            )}
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
            error={getError(input.name)}
          />
        ))}
      </div>
      <div className="mt-3 w-full mx-auto grid grid-cols-2 gap-x-3">
        {time.map((input) => (
          <Input
            key={input.name}
            inputInfo={input}
            handleChange={handleTimeChange}
            error={getError(input.name)}
          />
        ))}
      </div>
      <ProfileButton text={"Save"} handleClick={saveData} />
    </div>
  );
}
