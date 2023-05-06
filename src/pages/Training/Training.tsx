import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import Timer from "./Timer";
import { TrainingData, TrainType } from "../../@types/TrainTypes";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../api/paths";

import {
  faBackwardStep,
  faForwardStep,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { allWorkoutsType } from "../../@types/WorkoutType";
import StartScreen from "./StartScreen";
import ReactConfetti from "react-confetti";
import { SaveData } from "../../@types/ExerciseDataTypes";
import dayjs from "dayjs";
import { avgTimePerIntensity, Time } from "../../util/trainingCalculation";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";

export default function Training() {
  const [confettiWidth, setConfettiWidth] = useState<number | undefined>(
    undefined
  );
  const [confettiHeight, setConfettiHeight] = useState<number | undefined>(
    undefined
  );
  const [trainingId, setTrainingId] = useState<number>(0);
  const [restBetweenSets, setRestBetweenSets] = useState<number>(0);
  const [restBetweenWorkouts, setRestBetweenWorkouts] = useState<number>(0);
  const [numOfSets, setNumOfSets] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(false);
  const [trainingData, setTrainingData] = useState<TrainType[]>([]);
  const [finished, setFinished] = useState<boolean>(false);
  const [currentWorkout, setCurrentWorkout] = useState<TrainType>(
    trainingData[0]
  );
  const [workouts, setWorkouts] = useState<allWorkoutsType[]>([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState<number>(0);
  const [fromTo, setFromTo] = useState<{
    from: number;
    to: number;
  }>({
    from: 0,
    to: 2,
  });
  const [trainingTime, setTrainingTime] = useState<number>(0);
  const confetti = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localDataString = localStorage.getItem("trainingData");

    if (localDataString === null) {
      navigate(routes.CHOOSE_TRAINING);
      return;
    }

    const localData: TrainingData = JSON.parse(localDataString);
    const sizeOfData = localData.data.length - 1;
    setTrainingData([
      ...localData.data,
      {
        sequence: localData.data[sizeOfData].sequence + 1,
        time: null,
        repetition: null,
        name: "Finished",
        intensity: "low",
      },
    ]);
    setTrainingId(localData.trainingId);
    setWorkouts(localData.workouts);
    setRestBetweenSets(localData.restBetweenSets);
    setRestBetweenWorkouts(localData.restBetweenWorkouts);
    setNumOfSets(localData.numberOfSets);
    setCalories(localData.avgCalories);
  }, []);

  useEffect(() => {
    if (
      trainingData.length > 0 &&
      trainingData[currentWorkoutIndex].name === "Finished"
    ) {
      setFinished(true);
    }
    setCurrentWorkout(trainingData[currentWorkoutIndex]);
    setFromTo((prevFromTo) => {
      if (currentWorkoutIndex === 0) return { from: 0, to: 2 };
      if (currentWorkoutIndex === 1) return { from: 0, to: 3 };
      if (prevFromTo.from === trainingData.length - 1)
        return {
          from: trainingData.length - 3,
          to: trainingData.length - 1,
        };

      return { from: currentWorkoutIndex - 1, to: currentWorkoutIndex + 2 };
    });
  }, [currentWorkoutIndex]);

  useLayoutEffect(() => {
    if (!finished) return;
    if (!confetti.current) return;

    setConfettiHeight(confetti.current.clientHeight);
    setConfettiWidth(confetti.current.clientWidth);

    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const workoutTime = trainingData
      .filter((data) => data.name !== "Rest")
      .reduce(
        (acc, currentValue) =>
          (acc += currentValue.time
            ? Number(currentValue.time)
            : currentValue.repetition
            ? Number(currentValue.repetition) *
              avgTimePerIntensity[
                currentValue.intensity.toLowerCase() as keyof Time
              ]
            : 0),
        0
      );
    const caloriesBurnt = calories * (trainingTime / workoutTime);
    const today = dayjs(new Date()).format("DD.MM.YYYY");
    const userId = JSON.parse(user).userid;

    const data: SaveData = {
      name: "Workout",
      calories: Math.ceil(caloriesBurnt),
      time: `${trainingTime}`,
      avg_hearth_rate: null,
      trainingId: trainingId,
      date: today,
      userId,
    };

    console.log(data);

    axios
      .post(`${backend_paths.DATA}`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => localStorage.removeItem("trainingData"))
      .catch((err) => console.log(err));
  }, [finished]);

  const formatTime = (time: number) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setCurrentWorkoutIndex(0);
    setCurrentWorkout(trainingData[0]);
    setStart(true);
  };

  const handlePlay = () => {
    if (finished || !currentWorkout.time) return;
    setStopped(false);
  };

  const handleStop = () => {
    if (finished || !currentWorkout.time) return;
    setStopped(true);
  };

  return (
    <div className="w-full" ref={confetti}>
      {confettiWidth && confettiWidth && (
        <ReactConfetti
          numberOfPieces={100}
          width={confettiHeight}
          height={confettiHeight}
        />
      )}
      {!start && workouts.length > 0 && (
        <StartScreen
          workoutRest={restBetweenWorkouts}
          setRest={restBetweenSets}
          numOfSets={numOfSets}
          workouts={workouts}
          handleStart={handleStart}
        />
      )}
      {start && (
        <React.Fragment>
          <div className="mx-auto mt-3 w-1/3 max-w-[150px]">
            {currentWorkout.time && (
              <Timer
                stopped={stopped}
                finished={finished}
                currentWorkout={currentWorkout}
                timeText={formatTime(currentWorkout.time)}
                setCurrentWorkoutIndex={setCurrentWorkoutIndex}
                setTrainingTime={setTrainingTime}
              />
            )}

            {currentWorkout.repetition && (
              <h1 className="mt-[130px] text-xl">
                {currentWorkout.repetition}x {currentWorkout.name.toLowerCase()}
                (s)
              </h1>
            )}
          </div>
          <div className="flex flex-col w-full  relative mt-10 h-full max-h-[250px]  justify-center align-center items-center">
            {trainingData.map((data, index) => {
              const hidden: boolean =
                data.sequence < fromTo.from || data.sequence >= fromTo.to;
              const middle =
                fromTo.to - fromTo.from === 2
                  ? index === 0
                  : index === fromTo.from + 1;
              const top =
                fromTo.to - fromTo.from === 2
                  ? index === 0
                  : index <= fromTo.from;
              return (
                <WorkoutCard
                  key={index}
                  hidden={hidden}
                  middle={middle}
                  top={top}
                  text={data.name}
                  setActiveWorkoutIndex={setCurrentWorkoutIndex}
                />
              );
            })}

            <div className="w-1/2 mx-auto space-x-3 flex items-center justify-center">
              <Button
                icon={faBackwardStep}
                handleClick={() => {
                  if (finished) return;
                  if (currentWorkoutIndex !== 0)
                    setCurrentWorkoutIndex((prev) => --prev);
                }}
                myStyle="w-fit text-[45px]"
              />
              {!stopped && (
                <Button
                  icon={faStop}
                  handleClick={handleStop}
                  myStyle="w-fit text-[45px]"
                />
              )}
              {stopped && (
                <Button
                  icon={faPlay}
                  handleClick={handlePlay}
                  myStyle="w-fit text-[45px]"
                />
              )}
              <Button
                icon={faForwardStep}
                handleClick={() => {
                  if (!finished) setCurrentWorkoutIndex((prev) => ++prev);
                }}
                myStyle="w-fit text-[45px]"
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
