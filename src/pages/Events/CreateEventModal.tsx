import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddDataModal from "../../components/Modal/AddDataModal";
import Map from "../../components/Map/Map";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import ProfileButton from "../../components/Button/ProfileButton";
import dayjs from "dayjs";
import { CardEventType, SaveGroupEventType } from "../../@types/EventType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type CreateEventModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAllEvents: Dispatch<SetStateAction<CardEventType[]>>;
};
export default function CreateEventModal({
  setActive,
  setAllEvents,
}: CreateEventModalType) {
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "name",
      value: "",
      label: "Event name",
      type: "text",
    },
    {
      name: "max_people",
      value: "",
      label: "Number of persons",
      type: "text",
    },
  ]);
  const [dateTime, setDateTime] = useState<string>("");
  const [dateTimeFormatted, setDateTimeFormatted] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [postcode, setPostcode] = useState<string>("10000");
  const [townName, setTownName] = useState<string>("Zagreb");
  const [streetName, setStreetName] = useState<string>("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 45.815399,
    lng: 15.966568,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInput((prevUserInput) => {
      const newUserInput = [...prevUserInput];
      const index = newUserInput.findIndex((input) => input.name === name);
      newUserInput[index].value = value;
      return newUserInput;
    });
  };

  const handleSave = () => {
    let user = localStorage.getItem("staminaUser");
    if (!user) return;

    const data: SaveGroupEventType = {
      name: userInput[0].value,
      description: description,
      max_space: Number(userInput[1].value),
      date_time: dateTimeFormatted,
      street: streetName,
      pbr: Number(postcode),
      cityName: townName,
      userId: JSON.parse(user).userid,
    };

    axios
      .post(backend_paths.GROUP_EVENT, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setAllEvents((prevChallenges) => [...prevChallenges, data]);
        setActive(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <AddDataModal title={"Create event"} modalChange={() => setActive(false)}>
      <div className="flex-col w-full flex items-center space-y-2 py-2 px-3">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          timeZone="Europe/Zagreb"
        >
          <DateTimePicker
            renderInput={(props) => <TextField {...props} error={false} />}
            label="Start date/time"
            className="md:mr-3"
            value={dateTime}
            onChange={(newValue) => {
              if (newValue !== null) {
                setDateTime(newValue);
                const dateWithOffset = dayjs(newValue);
                setDateTimeFormatted(
                  dateWithOffset.format("YYYY.MM.DD-HH:mm:ss")
                );
              }
            }}
          />
        </LocalizationProvider>
        {userInput.map((input) => (
          <Input
            key={input.name}
            inputInfo={input}
            handleChange={handleChange}
            error={null}
          />
        ))}
        <Textarea
          placeholder="Description..."
          value={description}
          setValue={setDescription}
        />
        <Map
          setPostcode={setPostcode}
          setTownName={setTownName}
          setStreetName={setStreetName}
          location={location}
          setLocation={setLocation}
        />
      </div>
      <ProfileButton text={"Add group event"} handleClick={handleSave} />
    </AddDataModal>
  );
}
