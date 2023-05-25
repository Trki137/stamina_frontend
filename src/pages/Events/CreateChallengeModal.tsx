import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  CardChallengeType,
  SaveChallengeType,
  UpdateChallengeType,
} from "../../@types/EventType";
import Textarea from "../../components/Input/Textarea";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import ProfileButton from "../../components/Button/ProfileButton";
import MyDatePicker from "../../components/DatePicker/MyDatePicker";
import AddDataModal from "../../components/Modal/AddDataModal";
import dayjs from "dayjs";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type CreateChallengeModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
  oldValues?: CardChallengeType;
};

type Error = { name: string; message: string };
export default function CreateChallengeModal({
  setActive,
  setAllChallenges,
  oldValues,
}: CreateChallengeModalType) {
  const [error, setError] = useState<Error[]>([]);
  const dateFormatted = oldValues
    ? oldValues?.until.split(".")[1] +
      "." +
      oldValues?.until.split(".")[0] +
      "." +
      oldValues?.until.split(".")[2]
    : null;

  const [endDate, setEndDate] = useState<Date>(
    dateFormatted ? new Date(dateFormatted) : new Date()
  );
  const [description, setDescription] = useState<string>(
    oldValues ? oldValues.description : ""
  );
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "event_name",
      value: oldValues ? oldValues.name : "",
      type: "text",
      label: "Event name",
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

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

    const data: SaveChallengeType = {
      name: userInput[0].value,
      description,
      date: dayjs(endDate).format("DD.MM.YYYY"),
      userId: JSON.parse(user).userid,
    };

    const err: Error[] = validate();

    if (err.length) {
      setError(err);
      return;
    }

    axios
      .post(backend_paths.CHALLENGE, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setAllChallenges((prevChallenges) => [...prevChallenges, data]);
        setActive(false);
      })
      .catch((e) => console.log(e));
  };

  const handleUpdate = () => {
    setError([]);
    let user = localStorage.getItem("staminaUser");
    if (!user) return;
    if (!oldValues) return;

    const data: UpdateChallengeType = {
      eventId: oldValues.id,
      name: userInput[0].value,
      description,
      date: dayjs(endDate).format("DD.MM.YYYY"),
    };

    const card: CardChallengeType = {
      name: userInput[0].value,
      description,
      until: dayjs(endDate).format("DD.MM.YYYY"),
      id: oldValues.id,
      image: oldValues.image,
      createdby: oldValues.createdby,
      finished: oldValues.finished,
    };

    const err: Error[] = validate();

    if (err.length) {
      setError(err);
      return;
    }

    axios
      .put(backend_paths.CHALLENGE, data)
      .then((res) => res.data)
      .then((data) => {
        setAllChallenges((prevChallenges) =>
          prevChallenges.map((challenge) =>
            challenge.id !== oldValues.id ? challenge : card
          )
        );
        setActive(false);
      })
      .catch((e) => console.log(e));
  };

  const validate = () => {
    const err: Error[] = [];

    const dateFormatted =
      endDate.getDate() +
      "." +
      (endDate.getMonth() + 1) +
      "." +
      endDate.getFullYear();
    console.log(dateFormatted);

    if (new Date().getDate() > new Date(dateFormatted).getDate()) {
      err.push({
        name: "date",
        message: "Invalid date",
      });
    }

    if (userInput[0].value.length == 0) {
      err.push({
        name: userInput[0].name,
        message: "Event name field empty",
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
    <AddDataModal
      title={"Create challenge"}
      modalChange={() => setActive(false)}
    >
      <div className="w-2/3 mx-auto mt-3">
        <div className="space-y-4">
          <MyDatePicker
            error={!!getError("date")}
            setStartDate={setEndDate}
            startDate={endDate}
          />
          {userInput.map((input) => (
            <Input
              key={input.name}
              inputInfo={input}
              handleChange={handleChange}
              error={getError(input.name)}
            />
          ))}
          <Textarea
            placeholder={"Description..."}
            value={description}
            setValue={setDescription}
            error={!!getError("description")}
          />
        </div>
        <div className="mt-3">
          {!oldValues && (
            <ProfileButton text={"Create"} handleClick={handleSave} />
          )}
          {oldValues && (
            <ProfileButton text={"Update"} handleClick={handleUpdate} />
          )}
        </div>
      </div>
    </AddDataModal>
  );
}
