import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TrainType } from "../../@types/TrainTypes";

type TimerType = {
  currentWorkout: TrainType;
  timeText: string;
  setCurrentWorkoutIndex: Dispatch<SetStateAction<number>>;
  finished: boolean;
};
export default function Timer({
  currentWorkout,
  timeText,
  setCurrentWorkoutIndex,
  finished,
}: TimerType) {
  const [timeRemaining, setTimeRemaining] = useState(timeText);
  const [percentage, setPercentage] = useState<number>(100);
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    const updateTimer = () => {
      setUpdate((prev) => !prev);
    };

    const myInterval = setInterval(updateTimer, 1000);
    if (finished) clearInterval(myInterval);

    return () => clearInterval(myInterval);
  }, [finished]);

  useEffect(() => {
    if (!currentWorkout.time) return;
    let originalTime = currentWorkout.time;
    let minutes = Number(timeRemaining.split(":")[0]);
    let seconds = Number(timeRemaining.split(":")[1]);

    if (seconds === 0) {
      minutes -= 1;
      seconds = 59;
    } else seconds -= 1;

    const timeLeft = minutes * 60 + seconds;
    const newTimeRemaining = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    setPercentage((timeLeft / originalTime) * 100);
    setTimeRemaining(newTimeRemaining);
    if (minutes === 0 && seconds === 0) {
      setCurrentWorkoutIndex((prevWorkoutIndex) => prevWorkoutIndex + 1);
    }
  }, [update]);

  useEffect(() => {
    if (!currentWorkout.time) return;

    let minutes = Math.trunc(currentWorkout.time / 60);
    let seconds = currentWorkout.time % 60;
    setTimeRemaining(
      `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
  }, [currentWorkout]);

  return <CircularProgressbar value={percentage} text={timeRemaining} />;
}
