import React, { useEffect, useState } from "react";
import { trainingInfoCardType } from "../../@types/TrainingTypes";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import TrainingCard from "./TrainingCard";
import Filter from "./Filter";
import { muscleGroupType } from "../../@types/WorkoutType";

export default function ChooseTraining() {
  const [allTraining, setAllTraining] = useState<trainingInfoCardType[]>([]);
  const [intensityFilter, setIntensityFilter] = useState<string[]>([]);
  const [filteredMuscle, setFilteredMuscle] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<trainingInfoCardType[]>([]);

  const [allMuscles, setAllMuscles] = useState<muscleGroupType[]>([]);

  useEffect(() => {
    axios
      .get(`${backend_paths.TRAINING}/all-training`)
      .then((res) => res.data)
      .then((data) => setAllTraining(data))
      .catch((e) => console.log(e));

    axios
      .get(`${backend_paths.MUSCLE}`)
      .then((res) => res.data)
      .then((data) => setAllMuscles(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    let filter = [...allTraining];
    if (intensityFilter.length > 0)
      filter = filter.filter((data) =>
        intensityFilter.includes(data.intensity)
      );

    if (filteredMuscle.length > 0)
      filter = filter.filter((data) =>
        filteredMuscle.every((muscle) =>
          data.targeted_muscles.split(",").includes(muscle)
        )
      );

    setFiltered(filter);
  }, [allTraining, intensityFilter, filteredMuscle]);

  const getMinutes = (num: number) => {
    if (Number.isNaN(num)) return 0;
    //console.log(Math.ceil(num / 60));
    return Math.ceil(num / 60);
  };

  const maxTime = filtered
    .map((data) => data.time)
    .sort((t1, t2) => t2 - t1)[0];
  const minTime = filtered
    .map((data) => data.time)
    .sort((t1, t2) => t1 - t2)[0];

  const maxCal = filtered
    .map((data) => data.avg_calories)
    .sort((t1, t2) => t2 - t1)[0];
  const minCal = filtered
    .map((data) => data.avg_calories)
    .sort((t1, t2) => t1 - t2)[0];

  return (
    <React.Fragment>
      <div className="w-full flex flex-col">
        <Filter
          setIntensityFilter={setIntensityFilter}
          setFilteredMuscle={setFilteredMuscle}
          minTime={getMinutes(Number(minTime))}
          maxTime={getMinutes(Number(maxTime))}
          minCal={Number(minCal)}
          maxCal={Number(maxCal)}
          allMuscles={allMuscles}
        />
        <div className="w-full mb-8">
          {allTraining.length > 0 &&
            filtered.map((training) => (
              <TrainingCard key={training.trainingid} training={training} />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}
