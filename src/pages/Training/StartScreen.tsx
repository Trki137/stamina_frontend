import React, { useState } from "react";
import { allWorkoutsType } from "../../@types/WorkoutType";
import Button from "../../components/Button/Button";
import WorkoutInfo from "../AddTraining/WorkoutInfo";
import TrainingItem from "../AddTraining/TrainingItem";
import { nanoid } from "nanoid";

type StartScreenType = {
  workouts: allWorkoutsType[];
  handleStart: () => void;
  workoutRest: number;
  setRest: number;
  numOfSets: number;
};
export default function StartScreen({
  workoutRest,
  setRest,
  numOfSets,
  workouts,
  handleStart,
}: StartScreenType) {
  const [currentSelected, setCurrentSelected] = useState<number | null>(
    workouts && workouts.length > 0 ? workouts[0].workoutid : null
  );
  const [active, setActive] = useState<number>(
    workouts && workouts.length > 0 ? 0 : -1
  );
  const getInfo = () => {
    return workouts.filter(
      (workout) => workout.workoutid === currentSelected
    )[0];
  };

  return (
    <div className="w-full h-full flex p-6">
      <div className="m-auto w-1/3">
        <p>Rest between workouts: {workoutRest === 0 ? "None" : workoutRest}</p>
        <p>Rest between sets: {setRest}</p>
        <p>Number of sets: {numOfSets}</p>
        {workouts.map((workout, index) => (
          <TrainingItem
            key={nanoid()}
            data={{
              workout: workout,
              typeOfRepetition: "s",
              numOfRepetitions: "30",
            }}
            handleIndex={() => setActive(index)}
            active={active !== -1 && active === index}
            handleInfo={() => setCurrentSelected(workout.workoutid)}
          />
        ))}
        <div className="mt-2">
          <Button text={"Start workout"} handleClick={handleStart} />
        </div>
      </div>
      <div className="w-2/3">
        {currentSelected && <WorkoutInfo data={getInfo()} />}
      </div>
    </div>
  );
}
