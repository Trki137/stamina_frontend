import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import MySelect from "../../components/Select/MySelect";
import Input from "../../components/Input/Input";
import { workoutRepetitions } from "../../constants/WorkoutRepetitions";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import ProfileButton from "../../components/Button/ProfileButton";
import { userInputType } from "../../@types/LoginTypes";

type AddWorkoutFormType = {
  handleChange: (value: SelectValue) => void;
  selectedWorkout: Option | null;
  workoutSelectFormat: { value: string; label: string }[] | null;
  repetitionValue: userInputType;
  setRepetitionValue: Dispatch<SetStateAction<userInputType>>;
  setSelectedRepetitionOption: Dispatch<SetStateAction<Option | null>>;
  selectedRepetitionOption: Option | null;

  handleAddWorkout: () => void;
};

export default function AddWorkoutForm({
  handleChange,
  selectedWorkout,
  selectedRepetitionOption,
  setRepetitionValue,
  setSelectedRepetitionOption,
  workoutSelectFormat,
  handleAddWorkout,
  repetitionValue,
}: AddWorkoutFormType) {
  return (
    <div className="w-full flex flex-col gap-y-1 max-w-sm items-center align-middle justify-center ">
      <MySelect
        placeholder="Choose a workout"
        options={workoutSelectFormat}
        onChange={handleChange}
        value={selectedWorkout}
        isMultiple={false}
        fixedWidth={true}
      />
      <div className="flex items-center gap-x-2">
        <Input
          inputInfo={repetitionValue}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRepetitionValue((prev) => ({
              ...prev,
              value: e.target.value,
            }))
          }
          error={null}
        />
        <div className="w-[150px]">
          <MySelect
            placeholder={undefined}
            options={workoutRepetitions}
            onChange={(value: SelectValue) =>
              setSelectedRepetitionOption(value as Option)
            }
            value={selectedRepetitionOption}
            isMultiple={false}
            fixedWidth={false}
          />
        </div>
      </div>
      <ProfileButton text={"Add workout"} handleClick={handleAddWorkout} />
    </div>
  );
}
