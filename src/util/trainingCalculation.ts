import { allWorkoutsType } from "../@types/WorkoutType";
import { trainingInfoType, workoutsToSendType } from "../@types/TrainingTypes";

type CalorieCount = {
  high: number;
  moderate: number;
  low: number;
};

export type Time = {
  high: number;
  moderate: number;
  low: number;
};
export const avgTimePerIntensity: Time = {
  high: 6,
  moderate: 4.25,
  low: 2.5,
};
const averageCaloriesPerMinute: CalorieCount = {
  high: 10,
  moderate: 8,
  low: 5,
};

export function calculateTime(
  workouts: allWorkoutsType[],
  trainingInfo: workoutsToSendType,
  roundInfo: trainingInfoType
) {
  const numberOfSets = roundInfo.sets;

  let totalTime: number =
    roundInfo.restSet * numberOfSets +
    roundInfo.restWorkout * workouts.length * roundInfo.sets;

  for (let i = 0; i < workouts.length; i++) {
    const workout = workouts[i];

    const workoutInfo = trainingInfo.filter((w) => {
      return w.workoutid === workout.workoutid;
    })[0];

    if (!workoutInfo) continue;

    if (workoutInfo.time !== null) {
      totalTime += workoutInfo.time;
      continue;
    }
    if (workoutInfo.repetition === null) return;

    totalTime +=
      workoutInfo.repetition *
      numberOfSets *
      avgTimePerIntensity[workout.intensity.toLowerCase() as keyof Time];
  }

  return `${totalTime}`;
}

export function calculateAvgCalories(
  workouts: allWorkoutsType[],
  totalDuration: number,
  trainingInfo: workoutsToSendType,
  roundInfo: trainingInfoType
) {
  const totalCalories = workouts.reduce(
    (sum, workout) =>
      (sum +=
        averageCaloriesPerMinute[
          workout.intensity.toLowerCase() as keyof CalorieCount
        ] *
        getTime(
          workout.workoutid,
          trainingInfo,
          workout.intensity.toLowerCase()
        )),
    0
  );

  const durationWithoutRest =
    totalDuration -
    roundInfo.restWorkout * workouts.length -
    roundInfo.restSet * roundInfo.sets;

  const avgCalories = (totalCalories * roundInfo.sets) / durationWithoutRest;

  return `${Math.round(avgCalories * 100) / 100}`;
}

export function resolveIntensity(workouts: allWorkoutsType[]) {
  const highIntensityNumber = workouts.filter(
    (workout) => workout.intensity.toLowerCase() === "high"
  ).length;
  const moderateIntensityNumber = workouts.filter(
    (workout) => workout.intensity.toLowerCase() === "moderate"
  ).length;
  const lowIntensityNumber = workouts.filter(
    (workout) => workout.intensity.toLowerCase() === "low"
  ).length;

  if (
    highIntensityNumber >= moderateIntensityNumber &&
    highIntensityNumber >= lowIntensityNumber
  )
    return "high";
  if (
    moderateIntensityNumber >= highIntensityNumber &&
    moderateIntensityNumber >= lowIntensityNumber
  )
    return "moderate";

  return "low";
}

const getTime = (
  workoutid: number,
  trainingInfo: workoutsToSendType,
  intensity: string
) => {
  const workout = trainingInfo.filter(
    (info) => info.workoutid === workoutid
  )[0];

  if (!workout) return 0;
  if (workout.time !== null) return workout.time;

  return workout.repetition === null
    ? 0
    : workout.repetition * avgTimePerIntensity[intensity as keyof Time];
};
