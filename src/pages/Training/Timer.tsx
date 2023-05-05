import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TrainType } from "../../@types/TrainTypes";

type TimerType = {
  currentWorkout: TrainType;
  timeText: string;
  setCurrentWorkoutIndex: Dispatch<SetStateAction<number>>;
  finished: boolean;
  stopped: boolean;
};
export default function Timer({
  currentWorkout,
  timeText,
  setCurrentWorkoutIndex,
  finished,
  stopped,
}: TimerType) {
  const [stoppedWorkout, setStoppedWorkout] = useState<TrainType | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(timeText);
  const [percentage, setPercentage] = useState<number>(100);
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    const updateTimer = () => {
      setUpdate((prev) => !prev);
    };

    const myInterval = setInterval(updateTimer, 1000);
    if (finished) {
      clearInterval(myInterval);
    }
    if (stopped) {
      const stoppedWorkout = { ...currentWorkout };
      stoppedWorkout.time =
        Number(timeText.split(":")[0]) * 60 + Number(timeText.split(":")[1]);
      setStoppedWorkout(stoppedWorkout);
      clearInterval(myInterval);
    }

    return () => clearInterval(myInterval);
  }, [finished, stopped]);

  useEffect(() => {
    if (!currentWorkout.time) return;
    let originalTime =
      stoppedWorkout !== null ? stoppedWorkout.time : currentWorkout.time;
    if (!originalTime) return;
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
    setStoppedWorkout(null);

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
