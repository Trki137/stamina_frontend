import React from "react";
import Model, { IExerciseData } from "react-body-highlighter";

type BodyHighlighterType = {
  data: IExerciseData[];
  side: string;
};
export default function BodyHighlighter({ data, side }: BodyHighlighterType) {
  return (
    <Model
      style={{
        height: "100%",
        maxHeight: "200px",
        maxWidth: "150px",
        width: "100%",
      }}
      type={side === "posterior" ? "posterior" : "anterior"}
      data={data}
    />
  );
}
