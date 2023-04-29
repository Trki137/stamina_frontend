import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CardChallengeType, SaveChallengeType } from "../../@types/EventType";
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
import { allWorkoutsType } from "../../@types/WorkoutType";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

type CreateChallengeModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAllChallenges: Dispatch<SetStateAction<CardChallengeType[]>>;
};
export default function CreateChallengeModal({
  setActive,
  setAllChallenges,
}: CreateChallengeModalType) {
  const [selectedWorkout, setSelectedWorkout] = useState<Option | null>(null);
  const [allWorkouts, setAllWorkouts] = useState<allWorkoutsType[]>([]);
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
  useEffect(() => {
    axios
      .get(backend_paths.WORKOUT)
      .then((res) => res.data)
      .then((data) => setAllWorkouts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectChange = (value: SelectValue) => {
    setSelectedWorkout(value as Option);
  };

  const getWorkoutSelectFormat = () => {
    return allWorkouts.map((workout) => ({
      value: `${workout.workoutid}`,
      label: workout.name,
    }));
  };
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
    if (!selectedWorkout) return;

    const data: SaveChallengeType = {
      name: userInput[0].value,
      description,
      date: dayjs(startDate).format("DD.MM.YYYY"),
      workoutId: Number(selectedWorkout.value),
      userId: JSON.parse(user).userid,
    };

    console.log(data);

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
          <MySelect
            placeholder="Choose a workout"
            options={getWorkoutSelectFormat()}
            onChange={handleSelectChange}
            value={selectedWorkout}
            isMultiple={false}
            fixedWidth={true}
            searchable={true}
          />
        </div>
        <div className="mt-3">
          <ProfileButton text={"Create"} handleClick={handleSave} />
        </div>
      </div>
    </AddDataModal>
  );
}
