import React from "react";
import { workoutBodyTarget } from "../../@types/WorkoutType";
import BodyHighlighter from "../../components/BodyHighlighter/BodyHighlighter";

type TrainingMuscleWorkedType = {
  data: workoutBodyTarget;
};
export default function TrainingMuscleWorked({
  data,
}: TrainingMuscleWorkedType) {
  return (
    <div className="flex flex justify-center items-center px-8 max-w-md min-w-md">
      {data && (
        <React.Fragment>
          <BodyHighlighter
            data={data.posterior}
            side={"posterior"}
            maxWidth={"400px"}
            maxHeight={"400px"}
          />
          <BodyHighlighter
            data={data.anterior}
            side={"anterior"}
            maxWidth={"400px"}
            maxHeight={"400px"}
          />
        </React.Fragment>
      )}
    </div>
  );
}
