import React, { useEffect, useState } from "react";
import { trainingInfoCardType } from "../../@types/TrainingTypes";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import TrainingCard from "./TrainingCard";

export default function ChooseTraining() {
  const [allTraining, setAllTraining] = useState<trainingInfoCardType[]>([]);

  useEffect(() => {
    axios
      .get(`${backend_paths.TRAINING}/all-training`)
      .then((res) => res.data)
      .then((data) => setAllTraining(data))
      .catch((e) => console.log(e));
  }, []);

  console.log(allTraining);
  return (
    <div className="w-full">
      {allTraining.length > 0 &&
        allTraining.map((training) => (
          <TrainingCard key={training.trainingid} training={training} />
        ))}
    </div>
  );
}
