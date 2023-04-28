import React from "react";
import { trainingInfoCardType } from "../../@types/TrainingTypes";

import ChooseTrainingButton from "./ChooseTrainingButton";
import "./TrainingCard.css";

type TrainingCardType = {
  training: trainingInfoCardType;
};
export default function TrainingCard({ training }: TrainingCardType) {
  const getWorkoutTime = () => {
    const minutes = Math.floor(training.time / 60);
    const seconds = training.time % 60;

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  };

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  const getWorkoutGroup = () => {
    return "";
  };

  return (
    <div className="w-5/12  mx-auto mt-3 grid place-items-center font-mono  rounded-md">
      <div className="rounded-md shadow-lg w-full ">
        <div className="md:flex px-4 leading-none ">
          <div className="flex-col text-center text-gray-600 mx-auto">
            <p className="pt-4 text-2xl font-bold">{training.name}</p>
            <hr className="hr-text" />
            <div className="text-md  text-center flex flex-col justify-center px-4 my-2">
              <p className="font-bold ">
                {getWorkoutTime()} | {training.intensity}
              </p>

              <p className="font-bold mt-3">{training.targeted_muscles}</p>
            </div>
            <p className="hidden md:block  text-center my-4 text-sm text-left">
              {training.description}
            </p>

            <div className="text-xs my-5">
              <ChooseTrainingButton id={training.trainingid} />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 mb-4 w-full"></div>
      </div>
    </div>
  );
}
