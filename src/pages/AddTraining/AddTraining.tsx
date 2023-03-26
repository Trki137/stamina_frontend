import React, { useEffect, useState } from "react";
import { allWorkoutsType, selectedWorkoutType } from "../../@types/WorkoutType";
import { backend_paths } from "../../api/backend_paths";
import axios from "axios";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import ProfileButton from "../../components/Button/ProfileButton";
import { userInputType } from "../../@types/LoginTypes";
import { trainingDataTypes } from "../../@types/TrainingTypes";
import TrainingItem from "./TrainingItem";
import WorkoutInfo from "./WorkoutInfo";
import AddWorkoutForm from "./AddWorkoutForm";

export default function AddTraining() {
  const [repetitionValue, setRepetitionValue] = useState<userInputType>({
    label: "Repetition",
    value: "",
    type: "text",
    name: "repetition",
  });
  const [allWorkouts, setAllWorkouts] = useState<allWorkoutsType[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Option | null>(null);
  const [selectedRepetitionOption, setSelectedRepetitionOption] =
    useState<Option | null>(null);

  const [trainingData, setTrainingData] = useState<trainingDataTypes>({
    numOfSet: "",
    restBetweenSets: "",
    restBetweenWorkouts: "",
    workouts: [],
  });
  const [listOfWorkouts, setListOfWorkouts] = useState<selectedWorkoutType[]>(
    []
  );
  const [workoutInfo, setWorkoutInfo] = useState<allWorkoutsType | null>(null);
  const [isWorkoutAddPhaseActive, setIsWorkoutAddPhaseActive] =
    useState<boolean>(true);
  useEffect(() => {
    axios
      .get(backend_paths.WORKOUT)
      .then((res) => res.data)
      .then((data) => setAllWorkouts(data))
      .catch((err) => console.log(err));
  }, []);

  const getWorkoutSelectFormat = () => {
    return allWorkouts.map((workout) => ({
      value: `${workout.workoutid}`,
      label: workout.name,
    }));
  };

  const handleChange = (value: SelectValue) => {
    setSelectedWorkout(value as Option);
  };

  const handleAddWorkout = () => {
    if (!selectedWorkout || !selectedRepetitionOption) return;

    const workoutIndex = allWorkouts.findIndex(
      (workout) => workout.workoutid === parseInt(selectedWorkout.value)
    );
    const workout = allWorkouts[workoutIndex];

    const data: selectedWorkoutType = {
      workout,
      numOfRepetitions: repetitionValue.value,
      typeOfRepetition: selectedRepetitionOption.label,
    };
    setListOfWorkouts((prev) => [...prev, data]);
    setTrainingData((prev) => ({
      ...prev,
      workouts: [...prev.workouts, workout.workoutid],
    }));
  };

  const handleInfo = (id: number) => {
    const index = listOfWorkouts.findIndex(
      (workout) => workout.workout.workoutid === id
    );

    setWorkoutInfo(listOfWorkouts[index].workout);
  };

  const handleTrash = (id: number) => {
    setListOfWorkouts((prevWorkout) => {
      const index = prevWorkout.findIndex(
        (workout) => workout.workout.workoutid === id
      );
      if (index === 0) return [...prevWorkout.slice(1)];

      if (index === prevWorkout.length - 1)
        return [...prevWorkout.slice(0, index)];

      return [...prevWorkout.slice(0, index), ...prevWorkout.slice(index + 1)];
    });
  };

  const handleNext = () => {
    setIsWorkoutAddPhaseActive(false);
  };

  return (
    <div className="w-full h-full min-h-[700px] flex  justify-center ">
      <div className="w-full px-4 h-full my-auto max-w-sm flex flex-col items-center">
        {isWorkoutAddPhaseActive && (
          <React.Fragment>
            <AddWorkoutForm
              handleChange={handleChange}
              selectedWorkout={selectedWorkout}
              workoutSelectFormat={getWorkoutSelectFormat()}
              repetitionValue={repetitionValue}
              setRepetitionValue={setRepetitionValue}
              setSelectedRepetitionOption={setSelectedRepetitionOption}
              selectedRepetitionOption={selectedRepetitionOption}
              handleAddWorkout={handleAddWorkout}
            />

            <div className="w-full">
              {listOfWorkouts.map((workout, index: number) => (
                <TrainingItem
                  key={index}
                  data={workout}
                  handleInfo={() => handleInfo(workout.workout.workoutid)}
                  handleTrash={() => handleTrash(workout.workout.workoutid)}
                />
              ))}
            </div>
          </React.Fragment>
        )}

        {isWorkoutAddPhaseActive && (
          <div className="w-full py-2">
            <div className="w-1/3 flex items-start">
              <ProfileButton text="Next" handleClick={handleNext} />
            </div>
          </div>
        )}
      </div>
      {workoutInfo && <WorkoutInfo data={workoutInfo} />}
    </div>
  );
}