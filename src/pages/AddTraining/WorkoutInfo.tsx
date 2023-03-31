import React from "react";
import { allWorkoutsType } from "../../@types/WorkoutType";
import { IExerciseData, Muscle } from "react-body-highlighter";
import BodyHighlighter from "../../components/BodyHighlighter/BodyHighlighter";

type WorkoutInfoType = {
  data: allWorkoutsType;
};
export default function WorkoutInfo({ data }: WorkoutInfoType) {
  const posteriorData: IExerciseData[] = data.muscle_targeted
    .filter((muscle) => muscle.body_side === "posterior")
    .map((muscle) => ({
      name: data.name,
      muscles: [muscle.input_name] as Muscle[],
    }));
  const anteriorData: IExerciseData[] = data.muscle_targeted
    .filter((muscle) => muscle.body_side === "anterior")
    .map((muscle) => ({
      name: data.name,
      muscles: [muscle.input_name] as Muscle[],
    }));

  const getEquipmentString = (equipment: string[]) => {
    let list = "";
    for (let i = 0; i < equipment.length; i++) {
      if (i === equipment.length - 1) list += equipment[i];
      else list += equipment[i] + ", ";
    }
    return list;
  };

  const equipment: string =
    data.equipment === null
      ? "none"
      : getEquipmentString(data.equipment.map((equipment) => equipment.name));

  return (
    <div className="flex flex-col justify-center px-8 max-w-md min-w-md">
      <div className="flex w-full justify-center">
        <BodyHighlighter
          data={anteriorData}
          side={"anterior"}
          maxWidth="400px"
          maxHeight="400px"
        />
        <BodyHighlighter
          data={posteriorData}
          side={"posterior"}
          maxWidth="400px"
          maxHeight="400px"
        />
      </div>
      <div className="leading-7">
        <h3 className="font-bold text-xl">{data.name}</h3>
        <div className="flex flex-col text-start gap-y-2">
          <p>
            <strong>Description:</strong> {data.description}
          </p>
          <p>
            <strong>Equipment:</strong> {equipment}
          </p>
          <p>
            <strong>Exercise level:</strong> {data.intensity}
          </p>
        </div>
      </div>
    </div>
  );
}
