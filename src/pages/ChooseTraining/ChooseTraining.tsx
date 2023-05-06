import React, { useEffect, useState } from "react";
import { trainingInfoCardType } from "../../@types/TrainingTypes";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import TrainingCard from "./TrainingCard";
import Filter from "./Filter";
import { muscleGroupType } from "../../@types/WorkoutType";
import { sortValues } from "../../constants/SortValues";
import { SortValueTypes } from "../../@types/SortTypes";

export default function ChooseTraining() {
  const [first, setFirst] = useState<boolean>(true);
  const [allTraining, setAllTraining] = useState<trainingInfoCardType[]>([]);
  const [intensityFilter, setIntensityFilter] = useState<string[]>([]);
  const [filteredMuscle, setFilteredMuscle] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<trainingInfoCardType[]>([]);
  const [allMuscles, setAllMuscles] = useState<muscleGroupType[]>([]);
  const [currentSort, setCurrentSort] = useState<SortValueTypes | null>(null);
  const [time, setTime] = useState<number[]>([0, 0]);
  const [calories, setCalories] = useState<number[]>([0, 0]);
  useEffect(() => {
    axios
      .get(`${backend_paths.TRAINING}/all-training`)
      .then((res) => res.data)
      .then((data) => {
        setAllTraining(data);
        setFiltered(data);
      })
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

    if (currentSort) setSort(currentSort);
    else setFiltered(filter);
  }, [allTraining, intensityFilter, filteredMuscle]);

  const setSort = (sort: SortValueTypes) => {
    setCurrentSort(sort);
    const sorted = filtered.sort((data1, data2) => {
      const t1 = data1[`${sort.value}`];
      const t2 = data2[`${sort.value}`];

      return sort.order === "ASC" ? t1 - t2 : t2 - t1;
    });
    if (!first) setFiltered(sorted);
  };

  const getMinutes = (num: number) => {
    if (Number.isNaN(num)) return 0;
    return Math.ceil(num / 60);
  };

  useEffect(() => {
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

    console.log("Setting min and max");

    console.log(minTime, maxTime, minCal, maxCal);
    setTime([minTime, maxTime]);
    setCalories([getMinutes(minCal), getMinutes(maxCal)]);
  }, [filtered]);
  console.log(time);
  console.log(calories);
  return (
    <React.Fragment>
      <div className="w-full flex flex-col">
        <Filter
          setSort={setSort}
          sortValues={sortValues}
          setIntensityFilter={setIntensityFilter}
          setFilteredMuscle={setFilteredMuscle}
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
