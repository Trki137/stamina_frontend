import React from "react";
import { selectedWorkoutType } from "../../@types/WorkoutType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type TrainingItemType = {
  data: selectedWorkoutType;
  handleInfo?: () => void;
  handleTrash?: () => void;
};
export default function TrainingItem({
  data,
  handleInfo,
  handleTrash,
}: TrainingItemType) {
  const name = data.workout.name;

  return (
    <div className="flex w-full items-center mt-2 justify-between px-4 gap-x-5 py-3 bg-white border border-gray-200 rounded-md">
      <div className="flex items-center gap-x-3">
        <p className="text-lg">{name}</p>
        <p className="font-bold">
          {data.numOfRepetitions}
          {data.typeOfRepetition}
        </p>
      </div>
      <div className="flex items-center gap-x-3">
        {handleInfo && (
          <FontAwesomeIcon
            color="green"
            icon={faCircleInfo}
            onClick={handleInfo}
            className="cursor-pointer"
          />
        )}
        {handleTrash && (
          <FontAwesomeIcon
            color="red"
            icon={faTrashCan}
            onClick={handleTrash}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
