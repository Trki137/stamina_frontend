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
import {
  CardEventType,
  SaveGroupEventType,
  UpdateGroupEventType,
} from "../../@types/EventType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type CreateEventModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAllEvents: Dispatch<SetStateAction<CardEventType[]>>;
  oldData?: CardEventType;
};

export default function CreateEventModal({
  setActive,
  setAllEvents,
  oldData,
}: CreateEventModalType) {
  const [error, setError] = useState<Error[] | null>([]);
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "name",
      value: oldData ? oldData.name : "",
      label: "Event name",
      type: "text",
    },
    {
      name: "max_people",
      value: oldData && oldData.max_space ? `${oldData.max_space}` : "",
      label: "Number of persons",
      type: "text",
    },
  ]);
  const [dateTime, setDateTime] = useState<string>(
    oldData ? oldData.startsat : ""
  );
  const [dateTimeFormatted, setDateTimeFormatted] = useState<string>(
    oldData ? oldData.startsat : ""
  );
  const [description, setDescription] = useState<string>(
    oldData ? oldData.description : ""
  );

  const [postcode, setPostcode] = useState<string>(
    oldData && oldData.pbr ? `${oldData.pbr}` : "10000"
  );
  const [townName, setTownName] = useState<string>(
    oldData ? oldData.city : "Zagreb"
  );
  const [streetName, setStreetName] = useState<string>(
    oldData ? oldData.address : ""
  );

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: oldData && oldData.latitude ? oldData.latitude : 45.815399,
    lng: oldData && oldData.longitude ? oldData.longitude : 15.966568,
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
    setError([]);
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
      latitude: location.lat,
      longitude: location.lng,
    };

    const err = validate();

    if (err.length > 0) {
      setError(err);
      return;
    }

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

  const handleUpdate = () => {
    setError([]);
    let user = localStorage.getItem("staminaUser");
    if (!user) return;
    if (!oldData?.addressid) return;
    if (!oldData.cityid) return;

    const err: Error[] = validate();

    if (err.length > 0) {
      setError(err);
      return;
    }

    const data: UpdateGroupEventType = {
      addressId: oldData.addressid,
      cityId: oldData.cityid,
      name: townName,
      description: description,
      max_space: Number(userInput[1].value),
      date_time: dateTimeFormatted,
      street: streetName,
      pbr: Number(postcode),
      latitude: location.lat,
      longitude: location.lng,
      eventId: oldData.id,
      eventName: userInput[0].value,
    };

    const card: CardEventType = {
      name: userInput[0].value,
      description: description,
      max_space: Number(userInput[1].value),
      pbr: Number(postcode),
      latitude: location.lat,
      longitude: location.lng,
      createdby: oldData.createdby,
      city: townName,
      cityid: oldData.cityid,
      remainingspace: oldData.remainingspace,
      address: streetName,
      addressid: oldData.addressid,
      startsat: dateTimeFormatted,
      image: oldData.image,
      id: oldData.id,
    };

    axios
      .put(backend_paths.GROUP_EVENT, data)
      .then((res) => res.data)
      .then((data) => {
        setAllEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === oldData.id ? card : event))
        );
        setActive(false);
      })
      .catch((e) => console.log(e));
  };

  const validate = () => {
    const err: Error[] = [];

    if (dateTime.length == 0) {
      err.push({
        name: "time",
        message: "Date and time is not defined",
      });
    }

    if (userInput[0].value.length == 0) {
      err.push({
        name: userInput[0].name,
        message: "Event name field empty",
      });
    }
    if (userInput[1].value.length == 0) {
      err.push({
        name: userInput[1].name,
        message: "Number of person field empty",
      });
    }

    if (description.length == 0) {
      err.push({
        name: "description",
        message: "Description empty",
      });
    }

    return err;
  };

  const getError = (name: string) => {
    if (!error) return null;

    const index = error.findIndex((item) => item.name === name);
    return index !== -1 ? error[index].message : null;
  };

  return (
    <AddDataModal title={"Create event"} modalChange={() => setActive(false)}>
      <div className="flex-col w-full flex items-start space-y-2 py-2 px-3">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          timeZone="Europe/Zagreb"
        >
          <DateTimePicker
            renderInput={(props) => (
              <TextField {...props} error={!!getError("time")} />
            )}
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
        <div className="w-full max-w-[260px] flex flex-col">
          {userInput.map((input) => (
            <Input
              key={input.name}
              inputInfo={input}
              handleChange={handleChange}
              error={getError(input.name)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Description..."
          value={description}
          setValue={setDescription}
          error={!!getError("description")}
        />
        <Map
          setPostcode={setPostcode}
          setTownName={setTownName}
          setStreetName={setStreetName}
          location={location}
          setLocation={setLocation}
        />
      </div>
      {!oldData && (
        <ProfileButton text={"Add group event"} handleClick={handleSave} />
      )}
      {oldData && <ProfileButton text={"Update"} handleClick={handleUpdate} />}
    </AddDataModal>
  );
}
