import React from "react";
import { trainingInfoCardType } from "../../@types/TrainingTypes";

import ChooseTrainingButton from "./ChooseTrainingButton";
import "./TrainingCard.css";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { useNavigate } from "react-router-dom";
import { routes } from "../../api/paths";

type TrainingCardType = {
  training: trainingInfoCardType;
};
export default function TrainingCard({ training }: TrainingCardType) {
  const navigate = useNavigate();
  const getWorkoutTime = () => {
    const minutes = Math.floor(training.time / 60);
    const seconds = training.time % 60;

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  };

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  const handleClick = (trainingId: number) => {
    axios
      .get(`${backend_paths.TRAINING}/${trainingId}`)
      .then((res) => res.data)
      .then((data) => {
        let localData = localStorage.getItem("trainingData");
        if (localData !== null) localStorage.removeItem("trainingData");

        localStorage.setItem("trainingData", JSON.stringify(data));
        navigate(routes.TRAIN);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="w-7/12  max-w-lg mx-auto mt-3 grid place-items-center rounded-md">
      <div className="rounded-md shadow-lg w-full max-w-lg ">
        <div className="md:flex px-4 leading-none max-w-lg">
          <div className="max-w-sm  flex-col text-center text-gray-600 mx-auto">
            <p className="max-w-sm  pt-4 text-2xl font-bold">{training.name}</p>
            <hr className="hr-text" />
            <div className="max-w-sm  text-md flex-wrap  text-center flex flex-col justify-center px-4 my-2">
              <p className="max-w-sm  font-bold ">
                {getWorkoutTime()} | {training.intensity}
              </p>

              <p className="hidden sm:block font-bold max-w-sm md:inline my-4 text-md text-left  break-words">
                {training.targeted_muscles}
              </p>
            </div>
            <p className="max-w-sm hidden md:inline my-4 text-sm text-left flex-wrap break-words">
              {training.description}
            </p>

            <div className="max-w-sm text-xs my-5">
              <ChooseTrainingButton
                handleClick={() => handleClick(training.trainingid)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 mb-4 w-full"></div>
      </div>
    </div>
  );
}
