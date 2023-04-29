import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { CardChallengeType } from "../../@types/EventType";
import Textarea from "../../components/Input/Textarea";
import { userInputType } from "../../@types/LoginTypes";
import Input from "../../components/Input/Input";
import ProfileButton from "../../components/Button/ProfileButton";
import MyDatePicker from "../../components/DatePicker/MyDatePicker";
import AddDataModal from "../../components/Modal/AddDataModal";
import dayjs from "dayjs";
import MySelect from "../../components/Select/MySelect";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";

type CreateChallengeModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
  handleSelectChange: (value: SelectValue) => void;
  workoutSelectFormat: { value: string; label: string }[] | null;
  selectedWorkout: Option | null;
};
export default function CreateChallengeModal({
  setActive,
  setAllChallenges,
  handleSelectChange,
  workoutSelectFormat,
  selectedWorkout,
}: CreateChallengeModalType) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "event_name",
      value: "",
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

  console.log(dayjs(startDate).format("DD.MM.YYYY"));
  return (
    <AddDataModal
      title={"Create challenge"}
      modalChange={() => setActive(false)}
    >
      <div className="w-2/3 mx-auto mt-3">
        <div className="space-y-4">
          <MyDatePicker setStartDate={setStartDate} startDate={startDate} />
          {userInput.map((input) => (
            <Input inputInfo={input} handleChange={handleChange} error={null} />
          ))}
          <Textarea
            placeholder={"Description..."}
            value={description}
            setValue={setDescription}
          />
          <MySelect
            placeholder="Choose a workout"
            options={workoutSelectFormat}
            onChange={handleSelectChange}
            value={selectedWorkout}
            isMultiple={false}
            fixedWidth={true}
          />
        </div>
        <div className="mt-3">
          <ProfileButton text={"Create"} />
        </div>
      </div>
    </AddDataModal>
  );
}
