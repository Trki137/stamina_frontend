import React from "react";
import OptionCard from "./OptionCard";

import { cardData } from "../../constants/ExerciseCardInfo";

export default function Exercise() {
  return (
    <div className="flex flex-col gap-5 h-auto w-11/12 m-auto my-0 py-10">
      {cardData.map((data) => (
        <OptionCard data={data} key={data.imagePath} />
      ))}
    </div>
  );
}
