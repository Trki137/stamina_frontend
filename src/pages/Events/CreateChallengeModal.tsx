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
export default function CreateChallengeModal({
  setActive,
  setAllChallenges,
  oldValues,
}: CreateChallengeModalType) {
  const dateFormatted =
    oldValues?.until.split(".")[1] +
    "." +
    oldValues?.until.split(".")[0] +
    "." +
    oldValues?.until.split(".")[2];

  const [startDate, setStartDate] = useState<Date>(
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
    let user = localStorage.getItem("staminaUser");
    if (!user) return;

    const data: SaveChallengeType = {
      name: userInput[0].value,
      description,
      date: dayjs(startDate).format("DD.MM.YYYY"),
      userId: JSON.parse(user).userid,
    };

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
    let user = localStorage.getItem("staminaUser");
    if (!user) return;
    if (!oldValues) return;

    const data: UpdateChallengeType = {
      eventId: oldValues.id,
      name: userInput[0].value,
      description,
      date: dayjs(startDate).format("DD.MM.YYYY"),
    };

    const card: CardChallengeType = {
      name: userInput[0].value,
      description,
      until: dayjs(startDate).format("DD.MM.YYYY"),
      id: oldValues.id,
      image: oldValues.image,
      createdby: oldValues.createdby,
      finished: oldValues.finished,
    };

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

  return (
    <AddDataModal
      title={"Create challenge"}
      modalChange={() => setActive(false)}
    >
      <div className="w-2/3 mx-auto mt-3">
        <div className="space-y-4">
          <MyDatePicker setStartDate={setStartDate} startDate={startDate} />
          {userInput.map((input) => (
            <Input
              key={input.name}
              inputInfo={input}
              handleChange={handleChange}
              error={null}
            />
          ))}
          <Textarea
            placeholder={"Description..."}
            value={description}
            setValue={setDescription}
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
