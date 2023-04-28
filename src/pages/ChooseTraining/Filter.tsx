import React, { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { intensityLevel } from "../../constants/IntensityLevel";
import CheckBox from "../../components/Input/CheckBox";
import RangeSlider from "../../components/Input/RangeSlider";
import { muscleGroupType } from "../../@types/WorkoutType";
import Sort from "./Sort";
import { SortValueTypes } from "../../@types/SortTypes";

type FilterType = {
  setIntensityFilter: Dispatch<SetStateAction<string[]>>;
  setFilteredMuscle: Dispatch<SetStateAction<string[]>>;
  setSort: (sort: SortValueTypes) => void;
  sortValues: SortValueTypes[];
  maxTime: number;
  minTime: number;
  maxCal: number;
  minCal: number;
  allMuscles: muscleGroupType[];
};
export default function Filter({
  setIntensityFilter,
  maxTime,
  minTime,
  maxCal,
  minCal,
  allMuscles,
  setFilteredMuscle,
  setSort,
  sortValues,
}: FilterType) {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
  const handleIntensityChange = (value: string) => {
    setIntensityFilter((prevIntensityFilter) => {
      const exists = prevIntensityFilter.includes(value);
      if (!exists) return [...prevIntensityFilter, value];

      return prevIntensityFilter.filter((intensity) => intensity !== value);
    });
  };

  const handleMuscleChange = (value: string) => {
    setFilteredMuscle((prevMuscleFilter) => {
      const exists = prevMuscleFilter.includes(value);
      if (!exists) return [...prevMuscleFilter, value];

      return prevMuscleFilter.filter((muscle) => muscle !== value);
    });
  };

  const handleFilterActive = () =>
    setFilterActive((prevFilterActive) => !prevFilterActive);
  const handleClearAll = () => {
    setFilteredMuscle([]);
    setIntensityFilter([]);
    setClear((prevState) => !prevState);
  };
  return (
    <div className="w-full mt-1 mb-5 ">
      <div className="border-t-[1px] border-b-[1px] border-gray-200 flex justify-between items-center py-4">
        <div className="flex items-center px-3">
          <FontAwesomeIcon
            icon={faFilter}
            onClick={handleFilterActive}
            className="mr-1 cursor-pointer"
          />
          <span className="flex">
            <p className="mr-2 cursor-pointer" onClick={handleFilterActive}>
              Filter
            </p>{" "}
            |{" "}
            <p className="ml-2 cursor-pointer" onClick={handleClearAll}>
              Clear all
            </p>
          </span>
        </div>
        <div className=" px-3">
          <Sort setSort={setSort} sortValues={sortValues} />
        </div>
      </div>
      <div>
        {filterActive && (
          <div className="grid grid-cols-3">
            <div className="flex flex-col items-center mt-2">
              <p>Intensity</p>
              <div className="mt-2">
                {intensityLevel.map((intensity) => (
                  <CheckBox
                    key={intensity.value}
                    handleChange={handleIntensityChange}
                    name={intensity.value}
                    value={intensity.label}
                    clear={clear}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <div className="flex-col items-center justify-center">
                <p>Workout time</p>
                <RangeSlider
                  className="w-72 h-8"
                  marks={true}
                  value={[minTime, maxTime]}
                  max={maxTime}
                  min={minTime}
                />
              </div>
              <div>
                <p>Calories burnt</p>
                <RangeSlider
                  className="w-72 h-8"
                  value={[minCal, maxCal]}
                  max={maxCal}
                  min={minCal}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center mt-2 ">
              <p>Muscle group</p>
              <div className="mt-2 overflow-y-auto max-h-[200px]">
                {allMuscles.map((muscle) => (
                  <CheckBox
                    key={muscle.name}
                    handleChange={handleMuscleChange}
                    name={muscle.name}
                    value={muscle.name}
                    clear={clear}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
