import React from "react";
import Model, { IExerciseData } from "react-body-highlighter";

type BodyHighlighterType = {
  data: IExerciseData[];
  side: string;

  maxWidth?: string;
  maxHeight?: string;
};

// h-200, w-150
export default function BodyHighlighter({
  data,
  side,
  maxHeight,
  maxWidth,
}: BodyHighlighterType) {
  maxHeight = maxHeight ? maxHeight : "200px";
  maxWidth = maxWidth ? maxWidth : "150px";
  return (
    <Model
      style={{
        height: "100%",
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        width: "100%",
      }}
      type={side === "posterior" ? "posterior" : "anterior"}
      data={data}
    />
  );
}
