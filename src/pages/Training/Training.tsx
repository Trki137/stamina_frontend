import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import Timer from "./Timer";
import { TrainType } from "../../@types/TrainTypes";
import Button from "../../components/Button/Button";

export default function Training() {
  const [trainingData, setTrainingData] = useState<TrainType[]>([
    {
      sequence: 0,
      name: "Squat",
      time: null,
      repetition: 3,
    },
    {
      sequence: 1,
      name: "Deadlift",
      time: null,
      repetition: 5,
    },
    {
      sequence: 2,
      name: "Bench Press",
      time: 3,
      repetition: null,
    },
    {
      sequence: 3,
      name: "Barbell Row",
      time: 3,
      repetition: null,
    },
    {
      sequence: 4,
      name: "Squat",
      time: 5,
      repetition: null,
    },
  ]);
  const [finished, setFinished] = useState<boolean>(false);
  const [currentWorkout, setCurrentWorkout] = useState<TrainType>(
    trainingData[0]
  );
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState<number>(0);
  const [fromTo, setFromTo] = useState<{
    from: number;
    to: number;
  }>({
    from: 0,
    to: 2,
  });

  useEffect(() => {
    if (currentWorkoutIndex === trainingData.length) {
      setFinished(true);
      return;
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

  const formatTime = (time: number) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      <div className="mx-auto mt-3 w-1/3 max-w-[150px]">
        {currentWorkout.time && (
          <Timer
            finished={finished}
            currentWorkout={currentWorkout}
            timeText={formatTime(currentWorkout.time)}
            setCurrentWorkoutIndex={setCurrentWorkoutIndex}
          />
        )}
      </div>
      <div className="flex flex-col w-full  relative mt-10 h-full max-h-[400px] justify-center align-center items-center">
        {trainingData.map((data, index) => {
          const hidden: boolean =
            data.sequence < fromTo.from || data.sequence >= fromTo.to;
          const middle =
            fromTo.to - fromTo.from === 2
              ? index === 0
              : index === fromTo.from + 1;
          const top =
            fromTo.to - fromTo.from === 2 ? index === 0 : index <= fromTo.from;
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

        <div className="hidden w-1/2 space-x-3 mt-[150px] sm:flex">
          <Button
            text={"Prev"}
            handleClick={() => {
              if (currentWorkoutIndex === trainingData.length) return;
              if (currentWorkoutIndex !== 0)
                setCurrentWorkoutIndex((prev) => --prev);
            }}
          />
          <Button
            text={"Next"}
            handleClick={() => {
              if (currentWorkoutIndex < trainingData.length - 1)
                setCurrentWorkoutIndex((prev) => ++prev);
            }}
          />
        </div>
      </div>
    </div>
  );
}
