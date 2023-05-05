import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import Timer from "./Timer";
import { TrainType } from "../../@types/TrainTypes";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../api/paths";

import {
  faBackwardStep,
  faForwardStep,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

export default function Training() {
  const [start, setStart] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(false);
  const [trainingData, setTrainingData] = useState<TrainType[]>([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("trainingData");

    if (localData === null) {
      navigate(routes.CHOOSE_TRAINING);
      return;
    }

    const data: TrainType[] = JSON.parse(localData);
    setTrainingData(data);
  }, []);

  useEffect(() => {
    if (
      trainingData.length > 0 &&
      currentWorkoutIndex === trainingData.length
    ) {
      console.log(currentWorkoutIndex);
      console.log(trainingData.length);
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

  const handleStart = () => {
    setCurrentWorkoutIndex(0);
    setCurrentWorkout(trainingData[0]);
    setStart(true);
  };

  const handlePlay = () => {
    if (finished) return;
    setStopped(false);
  };

  const handleStop = () => {
    if (finished) return;
    setStopped(true);
  };

  return (
    <div className="w-full">
      {!start && (
        <div className="m-auto mt-20 w-1/3">
          <Button text={"Start workout"} handleClick={handleStart} />
        </div>
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

            <div className="w-1/2 space-x-3 mt-[150px] flex items-center justify-center">
              <Button
                icon={faBackwardStep}
                handleClick={() => {
                  if (currentWorkoutIndex === trainingData.length) return;
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
                  if (currentWorkoutIndex < trainingData.length - 1)
                    setCurrentWorkoutIndex((prev) => ++prev);
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
